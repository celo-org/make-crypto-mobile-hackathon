import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common"

export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      error: {
        message: (exception as Error)?.message,
      },
    })
  }
}
