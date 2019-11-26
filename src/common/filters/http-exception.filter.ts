import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();
    const status   = exception.getStatus ? exception.getStatus() :
    HttpStatus.INTERNAL_SERVER_ERROR;
    const error    = status !== HttpStatus.INTERNAL_SERVER_ERROR
    ? exception.message.error || exception.message ||  null
    : 'Internal server error';

    response
      .status(status)
      .json({
        statusCode: status,
        error,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
