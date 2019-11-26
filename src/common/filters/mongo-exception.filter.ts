import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse();
    const request  = ctx.getRequest();
    response
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({
       statusCode: exception.code,
       timestamp: new Date().toISOString(),
       path: request.url,
    });
  }
}
