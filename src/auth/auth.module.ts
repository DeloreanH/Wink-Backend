import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import {AuthController} from './auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { SharedModule } from '../shared/shared.module';
import { excludeMwRoutes } from '../common/enums/enums';
@Module({
    imports: [
      SharedModule,
      ],
    exports: [
    ],
    controllers: [
      AuthController,
    ],
    providers: [
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
