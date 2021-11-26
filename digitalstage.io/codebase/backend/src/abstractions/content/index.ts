import { ContentMetaInterface } from "./meta"

export interface ContentInterface {
  id: number
  name: string
  mediaSrc?: string
  meta?: ContentMetaInterface
}
