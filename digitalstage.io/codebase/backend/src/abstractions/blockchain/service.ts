import {
  BaseBlockchainParams,
  ExtendedBaseBlockchainParams,
  GetOwnedTokensParams,
  MintInfo,
  MintResult,
} from "."

export interface BlockchainServiceInterface {
  mint: (info: MintInfo) => Promise<MintResult>
  getOwnedTokenIds: (info: GetOwnedTokensParams) => Promise<number[]>
  getExtendedParams: <T extends BaseBlockchainParams>(params: T) => ExtendedBaseBlockchainParams & T
}
