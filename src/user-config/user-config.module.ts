import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { UserConfigController } from './user-config.controller';
import { AuthMiddleware } from 'src/shared/middlewares/auth.middleware';
import { EmptyProfileMiddleware } from 'src/shared/middlewares/empty-profile.middleware';
import { excludeMwRoutes } from 'src/shared/enums/enums';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/shared/schemas/category.schema';
import { SharedModule } from 'src/shared/shared.module';
import { itemTypeSchema } from 'src/shared/schemas/item-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }, { name: 'ItemType', schema: itemTypeSchema }]),
    SharedModule,
  ],
  exports: [
    UserConfigService,
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
    )
    .forRoutes(UserConfigController);
  }
}
