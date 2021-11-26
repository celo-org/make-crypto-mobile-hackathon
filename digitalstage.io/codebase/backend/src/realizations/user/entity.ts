import { UserInterface } from "src/abstractions/user"
import { Entity, PrimaryColumn } from "typeorm"

export const USER_TABLE_NAME = "users"

@Entity(USER_TABLE_NAME)
export class UserEntity implements UserInterface {
  @PrimaryColumn("varchar", {
    length: 40,
    unique: true,
  })
  uuid!: string
}
