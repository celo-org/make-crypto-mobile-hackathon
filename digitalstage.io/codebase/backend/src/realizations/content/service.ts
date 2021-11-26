import { ContentInterface } from "../../abstractions/content"
import { ContentServiceInterface } from "../../abstractions/content/service"
import { In, Repository } from "typeorm"
import { ContentEntity } from "./models/index/model"
import { ContentMetaEntity } from "./models/meta/model"
import { ContentMetaInterface } from "src/abstractions/content/meta"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

export class ContentService implements ContentServiceInterface {
  constructor(
    private contentRepository: Repository<ContentInterface>,
    private contentMetaRepository: Repository<ContentMetaInterface>,
  ) {}

  create = async (
    name: string,
    data?: Record<any, any>,
    mediaSrc?: string,
  ): Promise<ContentInterface> => {
    const meta = await this.contentMetaRepository.save({
      json: data,
    })
    const content = await this.contentRepository.save({
      mediaSrc,
      name,
      meta,
    })
    return content
  }

  read = async (id: number): Promise<ContentInterface> => {
    return await this.contentRepository.findOneOrFail({
      where: { id },
      relations: ["meta"],
    })
  }

  getByIds = async (ids: number[], withRelations?: boolean): Promise<ContentInterface[]> => {
    const relations = withRelations ? ["meta"] : []
    return await this.contentRepository.find({
      where: {
        id: In(ids),
      },
      relations,
    })
  }
}

@Injectable()
export class NestContentService extends ContentService {
  constructor(
    @InjectRepository(ContentEntity) contentRepository: Repository<ContentInterface>,
    @InjectRepository(ContentMetaEntity) contentMetaRepository: Repository<ContentMetaInterface>,
  ) {
    super(contentRepository, contentMetaRepository)
  }
}
