import { Module } from "@nestjs/common"
import { BlockchainModule } from "../blockchain/module"
import { ContentModule } from "../content/module"
import { TokenModule } from "../token/module"
import { NFTController } from "./controller"
import { NestNFTService } from "./service"

@Module({
  imports: [BlockchainModule, ContentModule, TokenModule],
  providers: [NestNFTService],
  exports: [NestNFTService],
  controllers: [NFTController],
})
export class NFTModule {}
