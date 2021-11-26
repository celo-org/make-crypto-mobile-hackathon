import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthServiceInterface, BaseUserInterface } from "src/abstractions/auth"
import { RequestUserInterface } from "src/abstractions/auth/request"
import { NestAuthService } from "./service"

class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(secret: string, private authService: AuthServiceInterface<BaseUserInterface>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })
  }

  async validate(payload: RequestUserInterface & any): Promise<unknown> {
    try {
      const user = await this.authService.verifyUserAuthByRefreshToken(
        payload.refreshToken,
        payload.uuid,
      )
      payload.user = user
      return payload
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}

@Injectable()
export class NestJwtStrategy extends JwtStrategy {
  constructor(configService: ConfigService, authService: NestAuthService) {
    super(configService.get("JWT_SECRET"), authService)
  }
}
