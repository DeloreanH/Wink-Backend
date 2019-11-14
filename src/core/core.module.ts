import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';
import { EventsModule } from 'src/events/events.module';

@Module({
    imports: [
        SharedModule,
        UserConfigModule,
        WinkModule,
        EventsModule,
    ],
    exports: [
    ],
    providers: [],
})
export class CoreModule {}
