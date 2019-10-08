import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from '../common/interfaces/common.interface';

@Injectable()
export class AuthInterceptor implements NestInterceptor {

  constructor( private authServ: AuthService) {}

  /**
   * @description intercepta el token proveniente del servidor y lo mapea en un decorator
   * @author Harry Perez
   * @date 2019-10-08
   * @param auth
   * @returns Promise<any>
   * @memberof AuthInterceptor
   */
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
