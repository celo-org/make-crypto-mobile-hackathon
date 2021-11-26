import { BaseSoftDeleteStorageObjectInterface } from "src/abstractions/crud/soft-delete"
import { DeleteDateColumn } from "typeorm"

export class SoftDeleteBaseModel implements BaseSoftDeleteStorageObjectInterface {
  @DeleteDateColumn({
    type: "timestamp with time zone",
    transformer: {
      from: (value?: Date): any => {
        if (!value) return undefined
        return value.getTime()
      },
      to: (value?: any) => {
        return value
      },
    },
  })
  deletedAt?: number
}
