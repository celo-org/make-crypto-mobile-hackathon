export interface RefreshTokenInterface {
  uuid: string
  token: string
  expiresAt: number
  userUuid: string
}

export interface RefreshTokenServiceInterface {
  create: (token: string, userUuid: string, expiresAt: number) => Promise<RefreshTokenInterface>
  read: (token: string) => Promise<RefreshTokenInterface>
  delete: (token: string) => Promise<void>
}
