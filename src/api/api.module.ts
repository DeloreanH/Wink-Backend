import { Module } from '@nestjs/common';
import { EventsModule } from '@app/events';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';

@Module({
    imports: [
        UserConfigModule,
        WinkModule,
        EventsModule,
    ],
})
export class ApiModule {}
