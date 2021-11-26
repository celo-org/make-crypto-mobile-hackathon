import { RequestUserInterface } from "./request"

export interface BaseUserInterface {
  uuid: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthTokensExpiration {
  accessTokenExpiresAt: number
  refreshTokenExpiresAt: number
}

export type AuthTokensWithExpiration = AuthTokens & AuthTokensExpiration

export interface AuthServiceInterface<UserInterface extends BaseUserInterface> {
  generateAuthTokensForUser: (userUuid: string) => Promise<AuthTokensWithExpiration>
  verifyUserAuthByAccessToken: (
    accessToken: string,
  ) => Promise<UserInterface & RequestUserInterface>
  verifyUserAuthByRefreshToken: (refreshToken: string, userUuid: string) => Promise<UserInterface>
  refreshAuthTokens: (refreshToken: string) => Promise<AuthTokensWithExpiration>
  logout: (refreshToken: string) => Promise<void>
}
