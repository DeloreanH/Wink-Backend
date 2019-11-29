import { Module, Global } from '@nestjs/common';
import { UserService, ItemService } from '@app/core/services';

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
export class CoreModule {}
