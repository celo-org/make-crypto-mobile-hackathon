import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { RefreshTokenInterface, RefreshTokenServiceInterface } from "src/abstractions/auth/token"
import { StorageInterface } from "src/abstractions/crud"
import { PostgresStorage } from "src/realizations/crud"
import { Repository } from "typeorm"
import { RefreshTokenEntity } from "./entity"
import { v4 as getUuid } from "uuid"

class RefreshTokenService implements RefreshTokenServiceInterface {
  private storage: StorageInterface<RefreshTokenInterface>
  constructor(repository: Repository<RefreshTokenInterface>) {
    this.storage = new PostgresStorage(repository)
  }
  create = async (
    token: string,
    userUuid: string,
    expiresAt: number,
  ): Promise<RefreshTokenInterface> => {
    return await this.storage.create({
      uuid: getUuid(),
      token,
      userUuid,
      expiresAt,
    })
  }
  read = async (token: string): Promise<RefreshTokenInterface> => {
    return await this.storage.readOne({ token: { $value: token } })
  }
  delete = async (token: string): Promise<void> => {
    return await this.storage.deleteMany({ token: { $value: token } })
  }
}

@Injectable()
export class NestRefreshTokenService extends RefreshTokenService {
  constructor(@InjectRepository(RefreshTokenEntity) repository: Repository<RefreshTokenInterface>) {
    super(repository)
  }
}
