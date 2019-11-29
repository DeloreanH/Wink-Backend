import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '@auth/middlewares';
import { EmptyProfileMiddleware } from '@app/common/middlewares';
import { excludeMwRoutes } from '@app/common/enums';
import { MulterModule } from '@nestjs/platform-express';
import { setMulterOptions } from '@app/common/tools';
import { UserConfigService } from './user-config.service';
import { UserConfigController } from './user-config.controller';

@Module({
  imports: [
    MulterModule.register(
      setMulterOptions(
        10485760,
        process.env.AVATAR_UPLOAD_PATH,
        'jpg|jpeg|png|gif'),
      ),
  ],
  exports: [
  ],
  controllers: [
    UserConfigController,
  ],
  providers: [
   UserConfigService,
  ],
})
export class UserConfigModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(UserConfigController);
    consumer
    .apply(EmptyProfileMiddleware)
    .exclude(
      { path: excludeMwRoutes.UCONFIG_UPDATE_USER_BASIC_DATA, method: RequestMethod.PUT },
      { path: excludeMwRoutes.UCONFIG_UPLOAD_USER_AVATAR, method: RequestMethod.POST },
      )
    .forRoutes(UserConfigController);
  }
}
