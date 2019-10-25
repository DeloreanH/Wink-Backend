import { Module, MiddlewareConsumer } from '@nestjs/common';
import { WinkService } from './wink.service';
import { WinkController } from './wink.controller';
import { AuthMiddleware } from '../../auth/middlewares/auth.middleware';
import { EmptyProfileMiddleware } from '../../common/middlewares/empty-profile.middleware';

@Module({
  providers: [WinkService],
  controllers: [WinkController],
})
export class WinkModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware, EmptyProfileMiddleware )
    .forRoutes(WinkController);
  }
}
