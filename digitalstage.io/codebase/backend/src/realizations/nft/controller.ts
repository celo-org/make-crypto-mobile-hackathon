import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { GetContentByAddressRequestDto, MintRequestDTO } from "./dto"
import { NestNFTService } from "./service"

@ApiTags("NFT")
@Controller()
export class NFTController {
  constructor(private nftService: NestNFTService) {}
  @Post("mint")
  @ApiOperation({
    summary: "Creates new content, generates tokens and send them to address",
  })
  async mint(@Body() mintRequest: MintRequestDTO) {
    return await this.nftService.mint(mintRequest)
  }

  @Get("content/byAddress")
  @ApiOperation({
    summary: "Get all content by account address",
  })
  async getContentByAddress(@Query() getContentByAddressRequest: GetContentByAddressRequestDto) {
    return await this.nftService.getContentByAddress(getContentByAddressRequest)
  }
}
