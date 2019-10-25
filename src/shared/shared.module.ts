import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Global()
@Module({
    imports: [
      ],
      exports: [
        UserService,
        AuthService,
      ],
      controllers: [
      ],
      providers: [
        UserService,
        AuthService,
      ],
})
export class SharedModule {}
