import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from 'src/interfaces/common.interface';

@Injectable()
export class AuthInterceptor implements NestInterceptor {

  constructor( private authServ: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token   = request.body.access_token;
    if (!token) {
       throw new HttpException('no token was provide', HttpStatus.BAD_REQUEST);
    } else {
      try {
        request.servDecoded = await this.authServ.decode(token, true) as Payload;
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }
    return next.handle();
  }
}
