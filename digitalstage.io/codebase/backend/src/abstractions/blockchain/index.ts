import { ContentInterface } from "../content"

export interface NetworkDataInterface {
  [key: number]: {
    providerUrl: string
    contractAddress: string
  }
}

export interface BaseBlockchainParams {
  networkId: number
}

export interface ExtendedBaseBlockchainParams extends BaseBlockchainParams {
  providerUrl: string
  contractAddress: string
}

export interface BasePrivateBlockchainParams extends BaseBlockchainParams {
  privateKey: string // never log
  contractOwnerAddress: string
}

export interface MintInfo extends BasePrivateBlockchainParams {
  toAddress?: string
  quantity: number
  content: ContentInterface
}

export interface GetOwnedTokensParams extends BaseBlockchainParams {
  address: string
}

export interface SuccessMintResult {
  tokenId: number
  transactionHash: string
}

export interface MintResult {
  contractAddress: string
  success: SuccessMintResult[]
}
