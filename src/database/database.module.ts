import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName } from '@app/database/enums';
import {
    userSchema,
    sesionSchema,
    categorySchema,
    itemSchema,
    itemTypeSchema,
    winkSchema,
    socialNetworkLinkSchema,
} from '@app/database/schemas';

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
            { name: modelName.SOCIAL_NETWORKS_LINK, schema: socialNetworkLinkSchema },
        ]),
        ],
        exports: [
        MongooseModule,
        ],
})
export class DatabaseModule {}
