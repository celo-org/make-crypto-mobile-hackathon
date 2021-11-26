import { ContentInterface } from "../content"
import { TokenStorageElement } from "../token"

export interface MintRequestInfo {
  contractOwnerAddress: string
  networkId: number
  toAddress?: string
  privateKey: string // never log
  quantity: number
  contentName: string
  contentMediaSrc?: string
  contentMeta?: Record<any, any>
}

export interface MintResponseInfo {
  tokens: TokenStorageElement[]
}

export interface GetContentByAddressRequestInfo {
  address: string
  networkId: number
}

export interface GetContentByAddressResponseInfo {
  content: ContentInterface[]
}
