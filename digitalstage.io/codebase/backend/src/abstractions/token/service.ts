import { TokenStorageElement } from "."
import { ContentInterface } from "../content"

export interface TokenServiceInterface {
  read: (id: number, withRelations?: boolean) => Promise<TokenStorageElement>
  create: (
    tokenId: number,
    contractAddress: string,
    networkId: number,
    content?: ContentInterface,
  ) => Promise<TokenStorageElement>
  getContentIds: (ids: number[], contractAddress: string) => Promise<number[]>
}
