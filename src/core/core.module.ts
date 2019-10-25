import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserConfigModule } from './user-config/user-config.module';
import { WinkModule } from './wink/wink.module';

@Module({
    imports: [
        SharedModule,
        UserConfigModule,
        WinkModule,
    ],
    exports: [
    ],
    controllers: [
    ],
    providers: [
    ],
})
export class CoreModule {}
