import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthUser } from 'src/auth/auth-decorators.decorator';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class EmptyProfileMiddleware implements NestMiddleware {

  constructor(private readonly userServ: UserService) {}

  use(req: any, res: any, next: () => void) {
    this.isProfileEmpty();
    next();
  }

  private async isProfileEmpty(@AuthUser() user?: User) {
    const us = await this.userServ.findUser({_id: user.userId});
    if (user.emptyProfile) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    } else {
      // blabla
    }
  };
}
