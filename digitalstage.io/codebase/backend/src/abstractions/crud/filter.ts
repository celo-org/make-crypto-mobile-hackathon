export enum FilterValues {
  More = "$more",
  Less = "$less",
  Value = "$value",
  Not = "$not",
  Like = "$like",
}

export enum SortValues {
  Increase = 1,
  Decrease = -1,
}

export type OneKeyFilter<Value> = {
  [key in FilterValues]?: Value
}

export type SortInfo<ObjectInterface> = {
  [key in keyof Partial<ObjectInterface>]: SortValues
}

export type BaseFilter<ObjectInterface> = {
  [Key in keyof Partial<ObjectInterface>]?: OneKeyFilter<Partial<ObjectInterface[Key]>>
}

export type FilterAdditional<ObjectInterface> = {
  skip?: number
  take?: number
  sort?: SortInfo<ObjectInterface>
  select?: (keyof ObjectInterface)[]
  relations?: (keyof ObjectInterface)[]
  withDeleted?: boolean
}

export type Filter<ObjectInterface> = BaseFilter<ObjectInterface> & {
  additional?: FilterAdditional<ObjectInterface>
}
