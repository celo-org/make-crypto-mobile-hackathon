import { ContentInterface } from "."

export interface ContentServiceInterface {
  create: (name: string, data?: Record<any, any>, mediaSrc?: string) => Promise<ContentInterface>
  read: (id: number) => Promise<ContentInterface>
  getByIds: (ids: number[], withRelations?: boolean) => Promise<ContentInterface[]>
}
