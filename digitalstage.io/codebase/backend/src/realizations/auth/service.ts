import * as jwt from "jsonwebtoken"
import { ForbiddenException, Injectable } from "@nestjs/common"
import {
  AuthServiceInterface,
  AuthTokensWithExpiration,
  BaseUserInterface,
} from "src/abstractions/auth"
import { RefreshTokenServiceInterface } from "src/abstractions/auth/token"
import { BaseUserService } from "src/abstractions/auth/user"
import { RequestUserInterface } from "src/abstractions/auth/request"
import { UserInterface } from "src/abstractions/user"
import { UserStorage } from "../user/storage"
import { ConfigService } from "@nestjs/config"
import { NestRefreshTokenService } from "./refresh-token/service"

class AuthService<UserInterface extends BaseUserInterface>
  implements AuthServiceInterface<UserInterface>
{
  constructor(
    private refreshTokenService: RefreshTokenServiceInterface,
    private userService: BaseUserService<UserInterface>,
    private jwtSecret: string,
    private jwtAccessTokenTTL: number,
    private jwtRefreshTokenTTL: number,
  ) {}
  verifyUserAuthByRefreshToken = async (
    refreshToken: string,
    userUuid: string,
  ): Promise<UserInterface> => {
    try {
      const token = await this.refreshTokenService.read(refreshToken)
      if (token.userUuid !== userUuid) throw Error()
      return await this.userService.read(userUuid)
    } catch (e) {
      throw new ForbiddenException()
    }
  }
  generateAuthTokensForUser = async (userUuid: string): Promise<AuthTokensWithExpiration> => {
    const userPayload = { uuid: userUuid }
    const refreshToken = jwt.sign(userPayload, this.jwtSecret, {
      expiresIn: `${this.jwtRefreshTokenTTL}s`,
    })
    const now = Date.now()
    const refreshTokenExpiresAt = now + this.jwtRefreshTokenTTL * 1000
    const accessToken = jwt.sign(
      { ...userPayload, refreshToken } as RequestUserInterface,
      this.jwtSecret,
      {
        expiresIn: `${this.jwtAccessTokenTTL}s`,
      },
    )
    this.refreshTokenService.create(refreshToken, userUuid, refreshTokenExpiresAt)
    return {
      accessToken,
      accessTokenExpiresAt: now + this.jwtAccessTokenTTL * 1000,
      refreshToken,
      refreshTokenExpiresAt,
    }
  }
  verifyUserAuthByAccessToken = async (
    accessToken: string,
  ): Promise<UserInterface & RequestUserInterface> => {
    try {
      const { refreshToken, uuid } = jwt.verify(accessToken, this.jwtSecret, {
        ignoreExpiration: false,
      }) as unknown as RequestUserInterface
      const user = await this.verifyUserAuthByRefreshToken(refreshToken, uuid)
      return {
        ...user,
        refreshToken,
      }
    } catch (e) {
      throw new ForbiddenException()
    }
  }
  refreshAuthTokens = async (refreshToken: string): Promise<AuthTokensWithExpiration> => {
    let userUuid: string
    try {
      const token = await this.refreshTokenService.read(refreshToken)
      // TODO: add expiring check
      userUuid = (
        jwt.verify(refreshToken, this.jwtSecret, {
          ignoreExpiration: false,
        }) as unknown as RequestUserInterface
      ).uuid
      if (token.userUuid !== userUuid) throw Error()
    } catch (e) {
      throw new ForbiddenException()
    }
    await this.refreshTokenService.delete(refreshToken)
    const authTokens = await this.generateAuthTokensForUser(userUuid)
    return authTokens
  }
  logout = async (refreshToken: string): Promise<void> => {
    return await this.refreshTokenService.delete(refreshToken)
  }
}

@Injectable()
export class NestAuthService extends AuthService<UserInterface> {
  constructor(
    refreshTokenService: NestRefreshTokenService,
    userService: UserStorage,
    configService: ConfigService,
  ) {
    super(
      refreshTokenService,
      userService,
      configService.get("JWT_SECRET"),
      configService.get("JWT_ACCESS_TOKEN_TTL"),
      configService.get("JWT_REFRESH_TOKEN_TTL"),
    )
  }
}
