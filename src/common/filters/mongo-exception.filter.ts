import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
