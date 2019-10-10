import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import {AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from './schemas/log.schema';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { SharedModule } from 'src/shared/shared.module';
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
