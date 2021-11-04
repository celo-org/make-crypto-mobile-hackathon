import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { getRouterContract } from './utils'


export class Router {
  web3: Web3
  contract: Contract

  constructor(web3: Web3) {
    this.web3 = web3
    this.contract = getRouterContract(web3)
  }
}
