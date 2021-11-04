import { TokenInfo } from './types';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { getRouterContract, getCusdContract, getERC20Contract } from './utils';
import { CUSD_ADDRESS } from './consts';
import { ERC20 } from './erc20';
import BigNumber from 'bignumber.js';

const defaultTokenList = require('@ubeswap/default-token-list').tokens;


export class TokenManager {
  web3: Web3;
  tokens: Token[] = [];
  symbolMap: Record<string, Token> = {};
  addressMap: Record<string, Token> = {};

  constructor(web3: Web3) {
    this.web3 = web3;
  }

  async getOrCreateTokenFromAddress(address: string): Promise<Token> {
    if (address.toLowerCase() in this.addressMap) {
      return this.addressMap[address.toLowerCase()];
    }
    const token = await Token.tokenFromAddress(address.toLowerCase(), this.web3);
    this.addressMap[address.toLowerCase()] = token;
    this.symbolMap[token.normalizedSymbol] = token;
    this.tokens.push(token)
    return token;
  }

  fromSymbol(symbol: string): Token {
    return this.symbolMap[ERC20.normalizeSymbol(symbol)];
  }

  fromAddress(address: string): Token {
    return this.addressMap[address.toLowerCase()];
  }
}

export class Token extends ERC20 {
  router: Contract;
  trusted: boolean;

  static async tokenFromAddress(address: string, web3: Web3): Promise<Token> {
    const token = new Token(address, web3);
    await token.init();
    return token;
  }

  constructor(address: string, web3: Web3) {
    super(address, web3);
    this.router = getRouterContract(this.web3);
  }

  async init() {
    await super.init();
    this.trusted = defaultTokenList.find((token: Token) => token.address === this.address) ? true : false;
  }

  async getBalanceInCusd(): Promise<BigNumber> {
    const balance = await this.getBalanceInWei();
    return await this.getCusdValue(balance);
  }

  async getCusdValue(wei: BigNumber): Promise<BigNumber> {
    if (wei <= new BigNumber(0)) {
      return new BigNumber(0);
    }

    let cusdValue;
    if (this.address === CUSD_ADDRESS) {
      cusdValue = wei;
    } else {
      const result = await this.router.methods.getAmountsOut(
	wei,
	[this.address, CUSD_ADDRESS]
      ).call();
      console.log(result);
      cusdValue = new BigNumber(result.slice(-1)[0]);
    }
    console.log(cusdValue.dividedBy(new BigNumber(10**18)).toString());
    return this.weiToUnits(cusdValue);
  }
}
