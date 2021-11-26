import { ContentInterface } from "../content"

export interface TokenStorageElement {
  id: number
  tokenId: number
  networkId: number
  contractAddress: string
  content?: ContentInterface
  contentId?: number
}
