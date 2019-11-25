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
  }
}
