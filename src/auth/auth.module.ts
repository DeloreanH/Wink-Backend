import { Module, MiddlewareConsumer, RequestMethod, NestModule, Global } from '@nestjs/common';
import { AuthController } from '@auth/controllers';
import { AuthMiddleware } from '@auth/middlewares';
import { excludeMwRoutes } from '@app/common/enums';
import { AuthService } from '@auth/services';
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
