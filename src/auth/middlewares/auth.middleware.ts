import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../shared/services/user.service';
import { verify } from 'jsonwebtoken';
import { IUser, IPayload } from '../../common/interfaces/interfaces';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userServ: UserService, private readonly authServ: AuthService) {}

  async use(req: any, res: any, next: () => void) {
      req.authUser = await this.validateToken(req.headers.authorization);
      next();
  }

  /**
   * @description metodo que valida el token
   * @author Harry Perez
   * @date 2019-10-02
   * @param auth
   * @returns Promise<User>
   * @memberof AuthGuard
   */
  private async validateToken(auth: string): Promise<IUser> {
    try {
        if (!auth) {
          throw new HttpException('token not found', HttpStatus.UNAUTHORIZED);
        }
        if (auth.split(' ')[0].toLowerCase()  !== 'bearer') {
            throw new HttpException('token must be prefixed with Bearer, malformated', HttpStatus.UNAUTHORIZED);
        }
        const token   = auth.split(' ')[1];
        const decoded = await verify(token, process.env.SECRET) as IPayload;
        await this.authServ.checkBlackList(token);
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
