import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { sesionSchema } from './schemas/sesion.schema';
import { CategorySchema } from './schemas/category.schema';
import { itemTypeSchema } from './schemas/item-type.schema';
import { itemSchema } from './schemas/item.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.MONGO_HOST,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            },
        ),
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
            { name: 'Sesion', schema: sesionSchema },
            { name: 'Category', schema: CategorySchema },
            { name: 'ItemType', schema: itemTypeSchema },
            { name: 'Item', schema: itemSchema },
        ]),
        ],
        exports: [
        MongooseModule,
        ],
        controllers: [
        ],
        providers: [
        ],
})
export class DatabaseModule {}
