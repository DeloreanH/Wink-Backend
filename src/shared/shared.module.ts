import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { sesionSchema } from './schemas/sesion.schema';
import { CategorySchema } from './schemas/category.schema';
import { itemTypeSchema } from './schemas/item-type.schema';
import { itemSchema } from './schemas/item.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: 'User', schema: userSchema },
          { name: 'Sesion', schema: sesionSchema },
          { name: 'Category', schema: CategorySchema },
          { name: 'ItemType', schema: itemTypeSchema },
          { name: 'Item', schema: itemSchema },
        ]),
      ],
      exports: [
        UserService,
        AuthService,
        MongooseModule,
      ],
      controllers: [
      ],
      providers: [
        AuthService,
        UserService,
      ],
})
export class SharedModule {}
