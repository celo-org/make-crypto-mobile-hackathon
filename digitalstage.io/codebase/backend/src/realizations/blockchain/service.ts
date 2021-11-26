import {
  BaseBlockchainParams,
  ExtendedBaseBlockchainParams,
  GetOwnedTokensParams,
  MintInfo,
  MintResult,
  NetworkDataInterface,
} from "../../abstractions/blockchain"
import * as Celo from "@celo/contractkit"
import { BlockchainServiceInterface } from "../../abstractions/blockchain/service"
import { Injectable } from "@nestjs/common"
const ContractABI = require("../../../contract/abi.json")
const networks = require("../../../contract/networks.js")

class BlockchainService implements BlockchainServiceInterface {
  constructor(private networks: NetworkDataInterface) {}
  getExtendedParams = <T extends BaseBlockchainParams>(
    params: T,
  ): ExtendedBaseBlockchainParams & T => {
    if (!this.networks[params.networkId]) throw Error("Such network is not available")
    return { ...params, ...this.networks[params.networkId] }
  }
  getOwnedTokenIds = async (info: GetOwnedTokensParams): Promise<number[]> => {
    const extendedInfo = this.getExtendedParams(info)
    const kit = this.getCeloClient(extendedInfo.providerUrl)
    const contractInstance = new kit.web3.eth.Contract(ContractABI, extendedInfo.contractAddress)
    const balance = await contractInstance.methods.balanceOf(extendedInfo.address).call()
    const tokens = []
    for (let i = 0; i < balance; i++) {
      const tokenId = await contractInstance.methods
        .tokenOfOwnerByIndex(extendedInfo.address, i)
        .call()
      tokens.push(parseInt(tokenId))
    }
    return tokens
  }
  mint = async (info: MintInfo): Promise<MintResult> => {
    const extendedInfo = this.getExtendedParams(info)
    if (!extendedInfo.toAddress) extendedInfo.toAddress = extendedInfo.contractOwnerAddress
    const promises = []
    const kit = this.getPrivateCeloClient(
      extendedInfo.providerUrl,
      extendedInfo.privateKey,
      extendedInfo.contractOwnerAddress,
    )
    for (let i = 0; i < extendedInfo.quantity; i++) {
      promises.push(this.mintOne(extendedInfo, kit))
    }
    // TODO: add error handling
    return { success: await Promise.all(promises), contractAddress: extendedInfo.contractAddress }
  }

  private mintOne = async (
    extendedInfo: MintInfo & ExtendedBaseBlockchainParams,
    kit: Celo.ContractKit,
  ) => {
    const contractInstance = new kit.web3.eth.Contract(ContractABI, extendedInfo.contractAddress)
    const txObject = await contractInstance.methods.safeMint(extendedInfo.toAddress)
    const tx = await kit.sendTransactionObject(txObject)
    const transactionHash = await tx.getHash()
    await tx.waitReceipt()
    const fullReceipt = await kit.web3.eth.getTransactionReceipt(transactionHash)
    const tokenId = kit.web3.utils.hexToNumber(fullReceipt.logs[0].topics[3])
    return { transactionHash, tokenId }
  }

  private getCeloClient = (providerUrl: string): Celo.ContractKit => {
    return Celo.newKit(providerUrl)
  }

  private getPrivateCeloClient = (
    providerUrl: string,
    privateKey: string,
    defaultFromAddress?: string,
  ) => {
    const kit = this.getCeloClient(providerUrl)
    kit.addAccount(privateKey)
    if (defaultFromAddress) kit.connection.defaultAccount = defaultFromAddress
    return kit
  }
}

@Injectable()
export class NestBlockchainService extends BlockchainService {
  constructor() {
    super(networks)
  }
}
