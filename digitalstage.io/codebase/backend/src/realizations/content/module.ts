import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ContentEntity } from "./models/index/model"
import { ContentMetaEntity } from "./models/meta/model"
import { NestContentService } from "./service"

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity, ContentMetaEntity])],
  providers: [NestContentService],
  exports: [NestContentService],
})
export class ContentModule {}
