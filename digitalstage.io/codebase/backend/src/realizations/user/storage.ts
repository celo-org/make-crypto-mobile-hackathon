import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserInterface } from "src/abstractions/user"
import { Repository } from "typeorm"
import { PostgresStorage } from "../crud"
import { UserEntity } from "./entity"

@Injectable()
export class UserStorage extends PostgresStorage<UserInterface> {
  constructor(@InjectRepository(UserEntity) userRepository: Repository<UserInterface>) {
    super(userRepository)
  }
}
