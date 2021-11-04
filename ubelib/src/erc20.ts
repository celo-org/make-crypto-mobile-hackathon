import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { getERC20Contract } from './utils';

export class ERC20 {
  web3: Web3;
  contract: Contract;
  address: string;
  name: string;
  symbol: string;
  normalizedSymbol: string;
  decimals: number;

  constructor(address: string, web3: Web3) {
    this.web3 = web3;
    this.address = address.toLowerCase();
    this.contract = getERC20Contract(this.address, this.web3);
  }

  static normalizeSymbol(symbol: string): string {
    return symbol.toLowerCase()
  }

  async init() {
    this.name = await this.contract.methods.name().call();
    this.symbol = await this.contract.methods.symbol().call();
    this.normalizedSymbol = ERC20.normalizeSymbol(this.symbol);
    this.decimals = await this.contract.methods.decimals().call();
  }

  equals(token: ERC20) {
    return this.address == token.address;
  }

  weiToUnits(wei: BigNumber): BigNumber {
    return wei.dividedBy(new BigNumber(10**this.decimals));
  }

  unitsToWei(units: BigNumber): BigNumber {
    return units.multipliedBy(new BigNumber(10**this.decimals));
  }

  async getBalanceInWei(): Promise<BigNumber> {
    const balance = await this.contract.methods.balanceOf(this.web3.eth.defaultAccount).call();
    return new BigNumber(balance);
  }

  async getBalanceInUnits(): Promise<BigNumber> {
    const balance = await this.getBalanceInWei();
    return this.weiToUnits(balance);
  }

  async getTotalSupplyInWei(): Promise<BigNumber> {
    const totalSupply = await this.contract.methods.totalSupply().call();
    return new BigNumber(totalSupply);
  }

  async getBalanceAsFraction(): Promise<BigNumber> {
    const totalSupplyInWei = await this.getTotalSupplyInWei();
    const balanceInWei = await this.getBalanceInWei();
    return balanceInWei.dividedBy(totalSupplyInWei);
  }

  async approve(amount: BigNumber, spender: string) {
    const result = await this.contract.methods.approve(spender, amount).send({
      from: this.web3.eth.defaultAccount,
      gas: 50000
    })
    return result
  }
}
