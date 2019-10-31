import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from './models-name';
import { userSchema } from './schemas/user.schema';
import { sesionSchema } from './schemas/sesion.schema';
import { categorySchema } from './schemas/category.schema';
import { itemTypeSchema } from './schemas/item-type.schema';
import { itemSchema } from './schemas/item.schema';
import { winkSchema } from './schemas/wink.schema';
import { socialNetworkLinkSchema } from './schemas/social-network-link.schema';

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
            { name: modelName.USER, schema: userSchema },
            { name: modelName.SESION, schema: sesionSchema },
            { name: modelName.CATEGORY, schema: categorySchema },
            { name: modelName.ITEM, schema: itemSchema },
            { name: modelName.ITEM_TYPE, schema: itemTypeSchema },
            { name: modelName.WINK, schema: winkSchema },
            { name: modelName.SOCIAL_LINK, schema: socialNetworkLinkSchema },
        ]),
        ],
        exports: [
        MongooseModule,
        ],
})
export class DatabaseModule {}
