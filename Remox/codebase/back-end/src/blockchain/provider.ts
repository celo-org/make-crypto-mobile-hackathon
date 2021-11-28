const ContractKit = require('@celo/contractkit')
import {ContractKit as contractkit} from '@celo/contractkit'
import Web3 from "web3"
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'

export class Provider {
    public web3:Web3;
    public kit:contractkit;
    public provider:any;

    constructor(url: string) {
        this.web3 = new Web3(url)
        this.kit = ContractKit.newKitFromWeb3(this.web3)
        this.provider = new CeloProvider(url);
    }
}