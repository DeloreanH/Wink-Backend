import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter';
@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        CoreModule,
        ApiModule,
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
