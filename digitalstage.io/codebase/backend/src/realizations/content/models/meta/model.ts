import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ContentMetaInterface } from "../../../../abstractions/content/meta"

export const CONTENT_META_ENTITY_NAME = "meta"

@Entity(CONTENT_META_ENTITY_NAME)
export class ContentMetaEntity implements ContentMetaInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("jsonb", { nullable: true })
  json?: Record<any, any>
}
