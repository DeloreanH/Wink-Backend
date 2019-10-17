import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserConfigModule } from './user-config/user-config.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.MONGO_HOST,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }),
        AuthModule,
        SharedModule,
        UserConfigModule,
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
