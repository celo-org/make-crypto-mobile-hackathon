import { StorageInterface, StorageRealisationBase } from "src/abstractions/crud"
import { BaseFilter, Filter, FilterValues, SortInfo } from "src/abstractions/crud/filter"
import {
  Between,
  Equal,
  FindConditions,
  FindManyOptions,
  FindOperator,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm"

type FilterConvertResult<ObjectInterface> = {
  [key in keyof ObjectInterface]?:
    | FindOperator<any>
    | ObjectInterface[key]
    | Array<FindOperator<any> | ObjectInterface[key]>
}

type SortConvertResult<ObjectInterface> = {
  [key in keyof ObjectInterface]?: 1 | -1
}

export class PostgresStorage<ObjectInterface>
  extends StorageRealisationBase<ObjectInterface, FindManyOptions<ObjectInterface>>
  implements StorageInterface<ObjectInterface>
{
  protected repository: Repository<ObjectInterface>
  protected relations?: string[]
  protected deleteRelations?: string[]
  protected fullRelations: string[]
  constructor(
    repository: Repository<ObjectInterface>,
    relations?: string[],
    deleteRelations?: string[],
  ) {
    super()
    this.repository = repository
    this.relations = relations
    this.deleteRelations = deleteRelations
    this.fullRelations = this.getFullRelations()
  }

  create = async (object: ObjectInterface, canBeExist?: boolean): Promise<ObjectInterface> => {
    let entity
    let exist = false
    try {
      entity = await this.read((object as any)?.uuid)
      exist = true
    } catch (e) {
      entity = this.repository.create()
    }
    if (exist && !canBeExist) throw Error("Such object is already exist")
    return await this.repository.save(Object.assign(entity, object))
  }

  async read(uuid: string): Promise<ObjectInterface> {
    let result
    try {
      result = await this.repository.findOneOrFail({ uuid } as any, {
        relations: this.relations,
      })
    } catch (e) {
      throw Error("Such was not found")
    }
    return result
  }

  update = async (uuid: string, updateInfo: Partial<ObjectInterface>): Promise<ObjectInterface> => {
    const entity = await this.repository.findOneOrFail({ uuid } as any)
    return await this.repository.save(Object.assign(entity, updateInfo))
  }

  softDelete = async (filter: Filter<ObjectInterface>): Promise<void> => {
    const element = await this.readOne(filter)
    await this.repository.softRemove(element)
  }

  private getFullRelations = () => {
    const result = []
    if (this.relations) result.push(...this.relations)
    if (this.deleteRelations) result.push(...this.deleteRelations)
    return result
  }

  delete = async (uuid: string, soft?: boolean): Promise<void> => {
    if (soft) {
      return await this.softDelete({
        uuid: { $value: uuid },
        additional: { select: ["uuid"], relations: this.fullRelations },
      } as any)
    }
    await this.repository.delete({ uuid } as any)
  }

  private softDeleteMany = async (filter: Filter<ObjectInterface>): Promise<void> => {
    if (!filter) filter = {}
    if (!filter.additional) filter.additional = {}
    filter.additional.select = ["uuid"] as any
    filter.additional.relations = this.fullRelations as any
    const elements = await this.readMany(filter)
    await this.repository.softRemove(elements)
  }

  deleteMany = async (filter: Filter<ObjectInterface>, soft?: boolean): Promise<void> => {
    if (soft) return await this.softDeleteMany(filter)
    const findInfo = this.convertFilter(filter).where as FindConditions<ObjectInterface>
    await this.repository.delete(findInfo)
  }

  async readOne(filter: Filter<ObjectInterface> = {}): Promise<ObjectInterface> {
    const findInfo = this.convertFilter(filter)
    try {
      return await this.repository.findOneOrFail(findInfo)
    } catch (e) {
      throw Error("Such was not found")
    }
  }

  async readMany(filter: Filter<ObjectInterface> = {}): Promise<ObjectInterface[]> {
    const findInfo = this.convertFilter(filter)
    return await this.repository.find(findInfo)
  }

  async updateMany(
    filter: Filter<ObjectInterface>,
    updateInfo: Partial<ObjectInterface>,
  ): Promise<void> {
    const findInfo = this.convertFilter(filter)
    await this.repository.update(findInfo.where as any, updateInfo as any)
  }

  count = async (filter?: Filter<ObjectInterface>): Promise<number> => {
    const findInfo = this.convertFilter(filter)
    return await this.repository.count(findInfo)
  }

  protected convertFilter = (
    fullFilter: Filter<ObjectInterface> = {},
  ): FindManyOptions<ObjectInterface> => {
    if (!fullFilter) return {}

    const additional = fullFilter.additional

    if (additional && additional.take && additional.take < 0) {
      additional.take = 0
    }

    delete fullFilter.additional

    const filter: BaseFilter<ObjectInterface> = { ...fullFilter }

    return {
      where: this.countWhere(filter),
      skip: additional?.skip,
      take: additional?.take,
      order: this.countSort(additional?.sort),
      select: additional?.select,
      relations: additional?.relations?.length
        ? (additional.relations as string[])
        : this.relations,
      withDeleted: additional?.withDeleted,
    }
  }

  private countSort = (
    sortInfo?: SortInfo<ObjectInterface>,
  ): SortConvertResult<ObjectInterface> => {
    if (!sortInfo) return {}
    return {
      ...sortInfo,
    }
  }

  private countWhere = (filter: BaseFilter<ObjectInterface>) => {
    const result: FilterConvertResult<ObjectInterface> = {}

    for (const key in filter) {
      for (const filterValue in filter[key]) {
        switch (filterValue) {
          case FilterValues.Less: {
            this.addValueToResult(result, key, filter[key][filterValue], LessThan)
            break
          }
          case FilterValues.More: {
            this.addValueToResult(result, key, filter[key][filterValue], MoreThan)
            break
          }
          case FilterValues.Value: {
            this.addValueToResult(result, key, filter[key][filterValue], (value) => value as any)
            break
          }
          case FilterValues.Not: {
            this.addValueToResult(result, key, filter[key][filterValue], Not)
            break
          }
          case FilterValues.Like: {
            this.addValueToResult(result, key, filter[key][filterValue], Like)
            break
          }
          default:
            throw Error("Such FilterValue " + filterValue + " is not defined")
        }
      }
    }

    return result
  }

  private countObjectValue = (
    oldValue: any,
    oldFunc: (value: unknown) => FindOperator<any>,
  ): {
    value: unknown
    func: (value: unknown) => FindOperator<any>
  } => {
    const value = {}
    const func = (value: unknown) => value as any
    for (const key in oldValue) {
      this.addValueToResult(value, key as any, oldValue[key] as any, oldFunc)
    }

    return { value, func }
  }

  private addValueToResult = <T extends keyof FilterConvertResult<ObjectInterface>>(
    result: FilterConvertResult<ObjectInterface>,
    key: T,
    value: unknown,
    func: (value: unknown) => FindOperator<any>,
  ) => {
    if (typeof value === "object") {
      const objectCountingResult = this.countObjectValue(value, func)
      value = objectCountingResult.value
      func = objectCountingResult.func
    }
    if (!result[key]) result[key] = func(value)
    else {
      if ((<Array<FindOperator<any> | ObjectInterface[T]>>result[key])?.length) {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(<Array<FindOperator<any> | ObjectInterface[T]>>result[key])?.push(func(value))
      } else {
        const existCopy = { ...result[key] }
        if (existCopy) (<any>result[key]) = [existCopy, func(value)]
      }
    }
  }
}
