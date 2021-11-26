import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { NFTModule } from "./realizations/nft/module"
import { APP_FILTER } from "@nestjs/core"
import { AllExceptionsFilter } from "./realizations/common/filters/error"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { AuthModule } from "./realizations/auth/module"
import { ThrottlerModule } from "@nestjs/throttler"
const ormConfig = require("../.ormconfig.js")

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_ACCESS_TOKEN_TTL}s` },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        ormConfig.url = configService.get("DB_STRING")
        return ormConfig
      },
    }),
    NFTModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
