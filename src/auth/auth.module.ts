import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import {AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from '../shared/schemas/log.schema';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';
import { SharedModule } from '../shared/shared.module';
@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Log', schema: logSchema }]),
      SharedModule,
      ],
    exports: [
      AuthService,
    ],
    controllers: [
      AuthController,
    ],
    providers: [
      AuthService,
    ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: '/auth/authenticate', method: RequestMethod.POST },
    )
    .forRoutes(AuthController);
  }
}
