import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Tools } from '../tools/tools';

@Injectable()
export class EmptyProfileMiddleware implements NestMiddleware {

  constructor(private readonly userServ: UserService) {}

  async use(req: any, res: any, next: () => void) {
    if (Tools.excludePath((req.baseUrl), ['auth', 'user'])) {
      next();
    } else {
      await this.validateEmptyProfile(req.authUser._id);
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
  async validateEmptyProfile(id: string): Promise<void> {
    try {
      const user = await this.userServ.findById(id);
      if (user.emptyProfile) {
        throw new HttpException('user profile must be completed to acces this route', HttpStatus.UNAUTHORIZED);
        }
    } catch (error) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
