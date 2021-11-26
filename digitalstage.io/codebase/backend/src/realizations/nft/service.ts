import { Injectable } from "@nestjs/common"
import { TokenStorageElement } from "src/abstractions/token"
import { MintInfo } from "../../abstractions/blockchain"
import { BlockchainServiceInterface } from "../../abstractions/blockchain/service"
import { ContentServiceInterface } from "../../abstractions/content/service"
import {
  GetContentByAddressRequestInfo,
  GetContentByAddressResponseInfo,
  MintRequestInfo,
  MintResponseInfo,
} from "../../abstractions/nft"
import { NFTServiceInterface } from "../../abstractions/nft/service"
import { TokenServiceInterface } from "../../abstractions/token/service"
import { NestBlockchainService } from "../blockchain/service"
import { NestContentService } from "../content/service"
import { NestTokenService } from "../token/service"

export class NFTService implements NFTServiceInterface {
  constructor(
    private blockchainService: BlockchainServiceInterface,
    private contentService: ContentServiceInterface,
    private tokenService: TokenServiceInterface,
  ) {}
  getContentByAddress = async (
    info: GetContentByAddressRequestInfo,
  ): Promise<GetContentByAddressResponseInfo> => {
    const extendedInfo = this.blockchainService.getExtendedParams(info)
    const tokenIds = await this.blockchainService.getOwnedTokenIds(info)
    const contentIds = await this.tokenService.getContentIds(tokenIds, extendedInfo.contractAddress)
    const content = await this.contentService.getByIds(contentIds, true)
    return { content }
  }

  private convertRequestInfo = async (requestInfo: MintRequestInfo) => {
    const content = await this.contentService.create(
      requestInfo.contentName,
      requestInfo.contentMeta,
      requestInfo.contentMediaSrc,
    )
    const info: MintInfo = {
      contractOwnerAddress: requestInfo.contractOwnerAddress,
      toAddress: requestInfo.toAddress,
      privateKey: requestInfo.privateKey,
      quantity: requestInfo.quantity,
      networkId: requestInfo.networkId,
      content,
    }
    return info
  }

  mint = async (requestInfo: MintRequestInfo): Promise<MintResponseInfo> => {
    const info = await this.convertRequestInfo(requestInfo)
    const mintResult = await this.blockchainService.mint(info)
    const promises = []
    for (let i = 0; i < mintResult.success.length; i++) {
      promises.push(
        this.tokenService.create(
          mintResult.success[i].tokenId,
          mintResult.contractAddress,
          info.networkId,
          info.content,
        ),
      )
    }
    // TODO: add error handling
    const tokens: TokenStorageElement[] = await Promise.all(promises)
    return {
      tokens,
    }
  }
}

@Injectable()
export class NestNFTService extends NFTService {
  constructor(
    blockchainService: NestBlockchainService,
    contentService: NestContentService,
    tokenService: NestTokenService,
  ) {
    super(blockchainService, contentService, tokenService)
  }
}
