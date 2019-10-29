import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';

@Global()
@Module({
    imports: [
      ],
      exports: [
        UserService,
        AuthService,
        ItemService,
      ],
      controllers: [
      ],
      providers: [
        UserService,
        AuthService,
        ItemService,
      ],
})
export class SharedModule {}
