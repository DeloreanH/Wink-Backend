import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { EmptyProfileMiddleware } from './common/middlewares/empty-profile.middleware';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }),
        UserModule,
        AuthModule,
    ],
    controllers: [
        AppController,
        UserController,
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
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware, EmptyProfileMiddleware)
          .forRoutes({ path: '*', method: RequestMethod.ALL });
      }
}
