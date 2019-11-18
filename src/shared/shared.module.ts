import { Module, Global } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ItemService } from './services/item.service';

@Global()
@Module({
      exports: [
        UserService,
        ItemService,
      ],
      providers: [
        UserService,
        ItemService,
      ],
})
export class SharedModule {}
