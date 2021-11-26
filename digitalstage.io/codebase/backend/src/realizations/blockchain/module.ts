import { Module } from "@nestjs/common"
import { NestBlockchainService } from "./service"

@Module({
  providers: [NestBlockchainService],
  exports: [NestBlockchainService],
})
export class BlockchainModule {}
