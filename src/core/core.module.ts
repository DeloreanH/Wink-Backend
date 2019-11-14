import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';
import { EventsModule } from '../events/events.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        SharedModule,
        AuthModule,
        UserConfigModule,
        WinkModule,
        EventsModule,
    ],
})
export class CoreModule {}
