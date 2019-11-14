import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
@Module({
    imports: [
        DatabaseModule,
        CoreModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        AppService,
    ],
})
export class AppModule {
}
