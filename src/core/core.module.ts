import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';
import { CoreGateway } from './gateway/core.gateway';

@Module({
    imports: [
        SharedModule,
        UserConfigModule,
        WinkModule,
    ],
    exports: [
    ],
    providers: [CoreGateway],
})
export class CoreModule {}
