export interface ServerInterface {
  initialize: () => Promise<void>
  connect: (port: number) => Promise<void>
  disconnect: () => Promise<void>
}

export enum ResponseStatus {
  Success = "ok",
  Error = "error",
}

type ResponseBase = {
  uuid: string
  status: ResponseStatus
}

type ErrorResponse = ResponseBase & {
  status: ResponseStatus.Error
  error: {
    message: string
  }
}

type SuccessResponse = ResponseBase & {
  status: ResponseStatus.Success
  [key: string]: any
}

export type Response = SuccessResponse | ErrorResponse
