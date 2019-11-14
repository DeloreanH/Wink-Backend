import { Module, MiddlewareConsumer, RequestMethod, NestModule, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { excludeMwRoutes } from '../common/enums/enums';
import { AuthService } from './services/auth.service';
@Global()
@Module({
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
      { path: excludeMwRoutes.AUTH_AUTHENTICATE, method: RequestMethod.POST },
    )
    .forRoutes(AuthController);
  }
}
