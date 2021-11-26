import { Filter } from "./filter"

export interface BaseStorageObjectInterface {
  uuid: string
}

export interface StorageInterface<ObjectInterface> {
  create: (object: ObjectInterface, canBeExist?: boolean) => Promise<ObjectInterface>
  read: (uuid: string) => Promise<ObjectInterface>
  update: (uuid: string, updateInfo: Partial<ObjectInterface>) => Promise<ObjectInterface>
  delete: (uuid: string, soft?: boolean) => Promise<void>
  readOne: (filter: Filter<ObjectInterface>) => Promise<ObjectInterface>
  readMany: (filter?: Filter<ObjectInterface>) => Promise<ObjectInterface[]>
  updateMany(filter: Filter<ObjectInterface>, updateInfo: Partial<ObjectInterface>): Promise<void>
  count: (filter?: Filter<ObjectInterface>) => Promise<number>
  deleteMany: (filter: Filter<ObjectInterface>, soft?: boolean) => Promise<void>
}

export abstract class StorageRealisationBase<ObjectInterface, FilterResult>
  implements StorageInterface<ObjectInterface>
{
  abstract create: (object: ObjectInterface, canBeExist?: boolean) => Promise<ObjectInterface>

  abstract read(uuid: string): Promise<ObjectInterface>
  abstract update: (uuid: string, updateInfo: Partial<ObjectInterface>) => Promise<ObjectInterface>

  abstract delete: (uuid: string) => Promise<void>
  abstract readOne(filter?: Filter<ObjectInterface>): Promise<ObjectInterface>
  abstract updateMany(
    filter: Filter<ObjectInterface>,
    updateInfo: Partial<ObjectInterface>,
  ): Promise<void>

  abstract count: (filter?: Filter<ObjectInterface>) => Promise<number>

  abstract readMany(filter?: Filter<ObjectInterface>): Promise<ObjectInterface[]>

  protected abstract convertFilter: (filter: Filter<ObjectInterface>) => FilterResult

  abstract deleteMany: (filter: Filter<ObjectInterface>) => Promise<void>
}
