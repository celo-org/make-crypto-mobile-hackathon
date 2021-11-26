import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { ContentInterface } from "../../abstractions/content"
import { TokenStorageElement } from "../../abstractions/token"
import { TokenServiceInterface } from "../../abstractions/token/service"
import { TokenEntity } from "./models/model"

class TokenService implements TokenServiceInterface {
  constructor(private tokenRepository: Repository<TokenStorageElement>) {}

  create = async (
    tokenId: number,
    contractAddress: string,
    networkId: number,
    content?: ContentInterface,
  ): Promise<TokenStorageElement> => {
    return await this.tokenRepository.save({
      tokenId,
      contractAddress,
      networkId,
      content,
    })
  }

  read = async (id: number, withRelations = false): Promise<TokenStorageElement> => {
    return await this.tokenRepository.findOneOrFail({
      where: { id },
      relations: withRelations ? ["content", "content.meta"] : [],
    })
  }

  getContentIds = async (ids: number[], contractAddress: string): Promise<number[]> => {
    const result = await this.tokenRepository.find({
      where: {
        contractAddress,
        tokenId: In(ids),
      },
      select: ["contentId"],
    })
    return result.map((one) => one?.contentId)
  }
}

@Injectable()
export class NestTokenService extends TokenService {
  constructor(@InjectRepository(TokenEntity) tokenRepository: Repository<TokenStorageElement>) {
    super(tokenRepository)
  }
}
