import { BaseUserInterface } from "."

export interface BaseUserService<User extends BaseUserInterface> {
  read: (uuid: string) => Promise<User>
}
