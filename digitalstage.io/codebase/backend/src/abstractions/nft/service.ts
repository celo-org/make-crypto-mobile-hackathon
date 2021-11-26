import {
  GetContentByAddressRequestInfo,
  GetContentByAddressResponseInfo,
  MintRequestInfo,
  MintResponseInfo,
} from "."

// TODO: change mint result structure
export interface NFTServiceInterface {
  mint: (info: MintRequestInfo) => Promise<MintResponseInfo>
  getContentByAddress: (
    info: GetContentByAddressRequestInfo,
  ) => Promise<GetContentByAddressResponseInfo>
}
