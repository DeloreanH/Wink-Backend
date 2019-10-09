import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Payload } from 'src/common/interfaces/common.interface';
import { verify } from 'jsonwebtoken';
import { User } from 'src/user/interfaces/user.interface';
import { Tools } from 'src/common/tools/tools';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userServ: UserService) {}

  async use(req: any, res: any, next: () => void) {
    if (Tools.excludePath((req.baseUrl), ['auth'])) {
      next();
    } else {
      req.authUser = await this.validateToken(req.headers.authorization);
      next();
    }
  }

  /**
   * @description metodo que valida el token
   * @author Harry Perez
   * @date 2019-10-02
   * @param auth
   * @returns Promise<User>
   * @memberof AuthGuard
   */
  private async validateToken(auth: string): Promise<User> {
    try {
        if (!auth) {
          throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
        }
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('token must be prefixed with Bearer, malformated', HttpStatus.UNAUTHORIZED);
        }
        const token   = auth.split(' ')[1];
        const decoded = await verify(token, process.env.SECRET) as Payload;
        const user    = await this.userServ.findById(decoded.sub._id);
        if (!user) {
          throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
        }
        return decoded.sub;
    } catch (error) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
