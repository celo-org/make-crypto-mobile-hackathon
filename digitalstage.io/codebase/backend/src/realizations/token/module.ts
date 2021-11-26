import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TokenEntity } from "./models/model"
import { NestTokenService } from "./service"

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity])],
  providers: [NestTokenService],
  exports: [NestTokenService],
})
export class TokenModule {}
