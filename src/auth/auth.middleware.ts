import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { Payload } from 'src/common/interfaces/common.interface';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userServ: UserService) {}

  async use(req: any, res: any, next: () => void) {
    req.authUser = await this.validateToken(req.headers.authorization);
    next();
  }

    /**
     * @description metodo que valida el token
     * @author Harry Perez
     * @date 2019-10-02
     * @param auth
     * @returns Promise<any>
     * @memberof AuthGuard
     */
    async validateToken(auth: string): Promise<any> {
      try {
          if (!auth) {
            throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
          }
          if (auth.split(' ')[0] !== 'Bearer') {
              throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
          }
          const token   = auth.split(' ')[1];
          const decoded = await verify(token, process.env.SECRET) as Payload;
          return decoded.sub;
      } catch (error) {
          throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      }
  }
}
