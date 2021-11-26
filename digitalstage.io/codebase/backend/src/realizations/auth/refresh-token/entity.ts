import { RefreshTokenInterface } from "src/abstractions/auth/token"
import { Column, Entity, PrimaryColumn } from "typeorm"

export const REFRESH_TOKEN_TABLE_NAME = "refresh_tokens"

@Entity(REFRESH_TOKEN_TABLE_NAME)
export class RefreshTokenEntity implements RefreshTokenInterface {
  @PrimaryColumn("varchar", {
    length: 40,
    unique: true,
  })
  uuid!: string

  @Column({ unique: true, type: "text" })
  token: string

  @Column({ type: "bigint" })
  expiresAt: number

  @Column()
  userUuid: string
}
