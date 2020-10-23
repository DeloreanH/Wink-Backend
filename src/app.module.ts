import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from '@app/database';
import { AuthModule } from '@auth';
import { CoreModule } from '@app/core';
import { ApiModule } from '@app/api';
import {
    MongoExceptionFilter,
    HttpExceptionFilter,
} from '@app/common/filters';
import { NotificationsModule } from '@app/notifications';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        CoreModule,
        ApiModule,
        ConfigModule.forRoot({
            isGlobal: true,
          }),
        NotificationsModule.forRoot(),
    ],
    controllers: [
        AppController,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: MongoExceptionFilter,
        },
        AppService,
    ],
})
export class AppModule {
}
