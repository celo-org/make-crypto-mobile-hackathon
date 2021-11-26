import { GetContentByAddressRequestInfo, MintRequestInfo } from "src/abstractions/nft"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsInt, IsOptional } from "class-validator"
import { Type } from "class-transformer"

export class MintRequestDTO implements MintRequestInfo {
  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  networkId: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  contractOwnerAddress: string

  @ApiProperty({ required: false })
  @IsOptional()
  toAddress?: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  privateKey: string

  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  quantity: number

  @ApiProperty({ required: true })
  contentName: string

  @ApiProperty({ required: false })
  @IsOptional()
  contentMediaSrc?: string

  @ApiProperty({ required: false })
  @IsOptional()
  contentMeta?: Record<any, any>
}

export class GetContentByAddressRequestDto implements GetContentByAddressRequestInfo {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  address: string
  @ApiProperty({ required: true })
  @IsInt()
  @Type(() => Number)
  networkId: number
}
