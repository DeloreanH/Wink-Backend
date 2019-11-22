import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { UserConfigController } from './user-config.controller';
import { AuthMiddleware } from '../../auth/middlewares/auth.middleware';
import { EmptyProfileMiddleware } from '../../common/middlewares/empty-profile.middleware';
import { excludeMwRoutes } from '../../common/enums/enums';
import { MulterModule } from '@nestjs/platform-express';
import { setMulterOptions } from '../../common/tools/multer.config';

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
      { path: excludeMwRoutes.UCONFIG_CONFIG, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_CATEGORIES, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_ITEMTYPES, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_CATEGORIES_ITEMS, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_USERITEMS, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_ADD_MANY_ITEMS_TO_USER, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_UPDATE_USER_BASIC_DATA, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_UPLOAD_USER_AVATAR, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_USER_AVATAR, method: RequestMethod.ALL },
      { path: excludeMwRoutes.UCONFIG_NEARBY_USERS, method: RequestMethod.ALL },
    )
    .forRoutes(UserConfigController);
  }
}
