import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from '@auth/middlewares';
import { EmptyProfileMiddleware } from '@app/common/middlewares';
import { WinkService } from './wink.service';
import { WinkController } from './wink.controller';

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
