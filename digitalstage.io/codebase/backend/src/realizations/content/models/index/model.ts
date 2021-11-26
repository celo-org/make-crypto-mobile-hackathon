import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { ContentInterface } from "../../../../abstractions/content"
import { ContentMetaInterface } from "../../../../abstractions/content/meta"
import { ContentMetaEntity } from "../meta/model"

export const CONTENT_ENTITY_NAME = "content"

@Entity(CONTENT_ENTITY_NAME)
export class ContentEntity implements ContentInterface {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("text")
  name!: string

  @Column("text", { nullable: true })
  mediaSrc?: string | undefined

  @OneToOne(() => ContentMetaEntity)
  @JoinColumn()
  meta?: ContentMetaInterface
}
