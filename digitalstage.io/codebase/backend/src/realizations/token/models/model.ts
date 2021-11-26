import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ContentInterface } from "../../../abstractions/content"
import { TokenStorageElement } from "../../../abstractions/token"
import { ContentEntity } from "../../content/models/index/model"

export const TOKEN_TABLE_NAME = "tokens"

@Entity(TOKEN_TABLE_NAME)
export class TokenEntity implements TokenStorageElement {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  tokenId!: number

  @Column("text")
  contractAddress!: string

  @ManyToOne(() => ContentEntity)
  @JoinColumn({
    name: "contentId",
  })
  content?: ContentInterface

  @Column()
  contentId?: number

  @Column()
  networkId!: number
}
