import { Module } from '@nestjs/common';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';
import { EventsModule } from '../events/events.module';

@Module({
    imports: [
        UserConfigModule,
        WinkModule,
        EventsModule,
    ],
})
export class ApiModule {}
