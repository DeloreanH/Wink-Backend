import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { UserConfigController } from './user-config.controller';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';
import { EmptyProfileMiddleware } from 'src/shared/middlewares/empty-profile.middleware';
import { excludeMwRoutes } from '../shared/enums/enums';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../shared/schemas/category.schema';
import { SharedModule } from '../shared/shared.module';
import { itemTypeSchema } from '../shared/schemas/item-type.schema';
import { itemSchema } from '../shared/schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'ItemType', schema: itemTypeSchema },
      { name: 'Item', schema: itemSchema},
    ]),
    SharedModule,
  ],
  exports: [
    UserConfigService,
    MongooseModule,
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
    )
    .forRoutes(UserConfigController);
  }
}
