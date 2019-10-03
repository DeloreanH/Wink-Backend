import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Payload } from '../interfaces/common.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * @description metodo que implementa la interfaz CanActivate, se encarga de la authenticacion
   * @author Harry Perez
   * @date 2019-10-02
   * @param context Contexto de ejecucion
   * @returns Promise<boolean>
   * @memberof AuthGuard
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    request.authUser = await this.validateToken(request.headers.authorization);
    return true;

  }

  /**
   * @description metodo que valida el token, guarda al usuario en el req para ser utilizado en el decorator @authUser(), retorna el sub del token
   * @author Harry Perez
   * @date 2019-10-02
   * @param auth
   * @returns Promise<any>
   * @memberof AuthGuard
   */
  async validateToken(auth: string): Promise<any> {
    try {
      if (auth.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      const token = auth.split(' ')[1];
      const decoded = await verify(token, process.env.SECRET) as Payload;
      return decoded.sub;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
