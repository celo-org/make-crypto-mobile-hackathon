import getRevertReason from 'eth-revert-reason'
import Web3 from 'web3';
import { Token, TokenManager } from './token';
import { Contract } from 'web3-eth-contract';
import { ROUTER_ADDRESS } from './consts'
import { getPairContract, getRouterContract, getFactoryContract } from './utils';
import { ERC20 } from './erc20';
import BigNumber from 'bignumber.js';

export class PairManager {
  web3: Web3;
  tokenManager: TokenManager;
  factory: Contract;

  trustedPairs: Pair[] = [];

  pairs: Pair[] = [];
  symbolMap: Record<string, Record<string, Pair>> = {};
  addressMap: Record<string, Pair> = {};

  constructor(web3: Web3) {
    this.web3 = web3;
    this.factory = getFactoryContract(this.web3);
    this.tokenManager = new TokenManager(web3);
  }

  sortTokens(tokenA: Token, tokenB: Token): Token[] {
    // Same implementation as in UniswapV2Library.sol
    if (tokenA.address < tokenB.address) {
      return [tokenA, tokenB];
    }
    return [tokenB, tokenA];
  }

  /**
   * Returns an array of valid pair addresses from the Factory contract
   */
  async getPairAddresses(): Promise<string[]> {
    const numPairs = await this.factory.methods.allPairsLength().call();
    const promises = []
    for (let i = 0; i < numPairs; i++) {
      promises.push(this.factory.methods.allPairs(i).call());
    }
    return await Promise.all(promises)
  }

  async initPairs() {
    const validPairAddresses = await this.getPairAddresses();

    await Promise.all(validPairAddresses.map(async pairAddress => {
      let pair

      try {
	pair = await Pair.pairFromAddress(pairAddress, this.tokenManager, this.web3);
      } catch (error) {
	//console.log(`Error while initializing pair at ${pairAddress}`)
	return
      }

      this.pairs.push(pair);
      this.addressMap[pairAddress.toLowerCase()] = pair;
      if (pair.trusted) {
	this.trustedPairs.push(pair);
      }

      if (!this.symbolMap[pair.tokenA.normalizedSymbol]) {
	this.symbolMap[pair.tokenA.normalizedSymbol] = {}
      }

      this.symbolMap[pair.tokenA.normalizedSymbol][pair.tokenB.normalizedSymbol] = pair;
    }));
  }

  fromAddress(address: string): Pair {
    return this.addressMap[address.toLowerCase()];
  }

  fromSymbols(symbolA: string, symbolB: string): Pair {
    let tokenA = this.tokenManager.fromSymbol(symbolA);
    let tokenB = this.tokenManager.fromSymbol(symbolB);
    [tokenA, tokenB] = this.sortTokens(tokenA, tokenB);
    return this.symbolMap[tokenA.normalizedSymbol][tokenB.normalizedSymbol];
  }
}


// https://github.com/Ubeswap/ubeswap/blob/ba4b20cbcc1023541c656bb8de4b1929dc61507e/contracts/uniswapv2/UniswapV2Pair.sol
export class Pair extends ERC20 {

  tokenManager: TokenManager;
  tokenA: Token;
  tokenB: Token;
  router: Contract;
  trusted: boolean;

  static async pairFromAddress(address: string, tokenManager: TokenManager, web3: Web3): Promise<Pair> {
    const pair = new Pair(address, tokenManager, web3);
    await pair.init();
    return pair;
  }

  /**
   * We inject the TokenManager here so that we don't re-create Token objects unnecessarily
   */
  constructor(address: string, tokenManager: TokenManager, web3: Web3) {
    super(address, web3);
    this.tokenManager = tokenManager;
    this.router = getRouterContract(this.web3);
    this.contract = getPairContract(address, this.web3);
  }

  async init() {
    await super.init();
    const addressTokenA = await this.contract.methods.token0().call();
    const addressTokenB = await this.contract.methods.token1().call();
    this.tokenA = await this.tokenManager.getOrCreateTokenFromAddress(addressTokenA);
    this.tokenB = await this.tokenManager.getOrCreateTokenFromAddress(addressTokenB);
    this.trusted = this.tokenA.trusted && this.tokenB.trusted;
  }

  async getAmountAForB(amountB: number): Promise<BigNumber> {
    const amountBWei = this.tokenB.unitsToWei(new BigNumber(amountB))
    const [reserveA, reserveB] = await this.getReserveInWei()
    const amountAWei = await this.router.methods.getAmountOut(amountBWei, reserveB, reserveA).call()
    return this.tokenA.weiToUnits(new BigNumber(amountAWei))
  }

  async getAmountBForA(amountA: number): Promise<BigNumber> {
    const amountAWei = this.tokenA.unitsToWei(new BigNumber(amountA))
    const [reserveA, reserveB] = await this.getReserveInWei()
    const amountBWei = await this.router.methods.getAmountOut(amountAWei, reserveA, reserveB).call()
    return this.tokenB.weiToUnits(new BigNumber(amountBWei))
  }

  async swapExactBForA(amountB: number, slippage: number, to: string): Promise<BigNumber> {
    const maxAmountA = await this.getAmountAForB(amountB)
    const minAmountA = maxAmountA.multipliedBy(new BigNumber(1 - slippage))

    const minAmountAWei = this.tokenA.unitsToWei(minAmountA).integerValue()
    const amountBWei = this.tokenB.unitsToWei(new BigNumber(amountB)).integerValue()

    const path = [this.tokenB.address, this.tokenA.address]
    const deadline = Math.floor(+new Date() / 1000) + 100

    await this.tokenB.approve(amountBWei, ROUTER_ADDRESS)
    const result = await this.router.methods.swapExactTokensForTokens(amountBWei, minAmountAWei, path, to, deadline).send({
      from: this.web3.eth.defaultAccount,
      gas: 250000
    })
    return result
  }

  async getMaxEqualValue(): Promise<BigNumber[]> {
    const amountTokenA  = await this.tokenA.getBalanceInWei()
    const amountTokenB = await this.tokenB.getBalanceInWei()

    const [reserveA, reserveB] = await this.getReserveInWei()

    const reserveAB = reserveA.dividedBy(reserveB)
    const amountAB = amountTokenA.dividedBy(amountTokenA)

    if (amountAB <= reserveAB) {
      return [amountTokenA, amountTokenA.multipliedBy(reserveB.dividedBy(reserveA))]
    }
    return [amountTokenB.multipliedBy(reserveA.dividedBy(reserveB)), amountTokenB]
  }

  async addMaxLiquidity() {
    const [amountTokenA, amountTokenB] = await this.getMaxEqualValue()
    //console.log(this.tokenA.weiToUnits(amountTokenA).toString(), this.tokenB.weiToUnits(amountTokenB).toString())

    const slippage = .05
    const deadline = Math.floor(+new Date() / 1000) + 100

    await this.tokenA.approve(amountTokenA.integerValue(), ROUTER_ADDRESS)
    await this.tokenB.approve(amountTokenB.integerValue(), ROUTER_ADDRESS)
    const result = await this.router.methods.addLiquidity(
      this.tokenA.address,
      this.tokenB.address,
      amountTokenA.integerValue(),
      amountTokenB.integerValue(),
      amountTokenA.multipliedBy(1 - slippage).integerValue(),
      amountTokenB.multipliedBy(1 - slippage).integerValue(),
      this.web3.eth.defaultAccount,
      deadline
    ).send({
      from: this.web3.eth.defaultAccount,
      gas: 250000
    })
  }

  async getReserveInWei(): Promise<BigNumber[]> {
    const reserves = await this.contract.methods.getReserves().call();
    return [new BigNumber(reserves._reserve0), new BigNumber(reserves._reserve1)];
  }

  async getReserveInUnits(): Promise<BigNumber[]> {
    const [tokenReserveA, tokenReserveB] = await this.getReserveInWei();
    return [this.tokenA.weiToUnits(tokenReserveA), this.tokenB.weiToUnits(tokenReserveB)];
  }

  // todo: fix
  async getReserveValueInCusd(): Promise<BigNumber> {
    const [tokenAReserve, tokenBReserve] = await this.getReserveInUnits();
    // This is very hacky. We can't put in the actual reserve values below because of the way that
    // getCusdValue calculates token value.
    const tokenACusdValue = await this.tokenA.getCusdValue(this.unitsToWei(new BigNumber(1)));
    const tokenBCusdValue = await this.tokenB.getCusdValue(this.unitsToWei(new BigNumber(1)));
    console.log(this.tokenA.address);
    console.log(tokenACusdValue.toString(), tokenBCusdValue.toString());
    const totalTokenACusdValue = tokenACusdValue.multipliedBy(tokenAReserve);
    const totalTokenBCusdValue = tokenBCusdValue.multipliedBy(tokenBReserve);
    return totalTokenACusdValue.plus(totalTokenBCusdValue);
  }

  async getWithdrawableAmounts(): Promise<BigNumber[]> {
    const balanceAsFraction = await this.getBalanceAsFraction();
    const [tokenReserveA, tokenReserveB] = await this.getReserveInUnits();
    return [tokenReserveA.multipliedBy(balanceAsFraction), tokenReserveB.multipliedBy(balanceAsFraction)];
  }

  // todo: fix this, it's broken
  async getBalanceInCusd(): Promise<BigNumber> {
    const reserveCusdValue = await this.getReserveValueInCusd();
    console.log(reserveCusdValue.toString());
    const balanceAsFraction = await this.getBalanceAsFraction();
    return reserveCusdValue.multipliedBy(balanceAsFraction);
  }


}
