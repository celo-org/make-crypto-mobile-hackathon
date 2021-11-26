import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "../user/module"
import { AuthController } from "./controller"
import { NestJwtStrategy } from "./jwt"
import { RefreshTokenEntity } from "./refresh-token/entity"
import { NestRefreshTokenService } from "./refresh-token/service"
import { NestAuthService } from "./service"

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokenEntity]), UserModule, ConfigModule],
  providers: [NestRefreshTokenService, NestAuthService, NestJwtStrategy],
  controllers: [AuthController],
  exports: [NestAuthService],
})
export class AuthModule {}
