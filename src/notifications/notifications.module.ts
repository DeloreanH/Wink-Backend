import { 
  DynamicModule,
  Module,
  Global,
} from '@nestjs/common';

import {
  NotificationsConfig,
  NotificationsService,
} from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DevicesTokensService } from './devices-tokens/devices-tokens.service';


@Global()
@Module({
  providers: [NotificationsService, DevicesTokensService],
  controllers: [NotificationsController],
  exports: [ NotificationsService ]
})
export class NotificationsModule {

  public static forRoot(config?: NotificationsConfig): DynamicModule {
    return {
      module: NotificationsModule,
      providers: [
        {
          provide: 'NotificationsConfig',
          useValue: config,
        },
        NotificationsService,
      ]
    };
  }

}
