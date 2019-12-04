import 'dotenv/config';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';
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

// data
import { categoriesSeed } from './data/categories.seed';
import { itemTypesSeed } from './data/itemTypes.seed';
import { usersItemsSeed } from './data/usersItems.seed';
import { usersSeed } from './data/usersSeed';
import { socialNetworkLinksSeed } from './data/socialNetworkLinks.seed';

// modelos
const category     = mongoose.model(modelName.CATEGORY, categorySchema);
const itemType     = mongoose.model(modelName.ITEM_TYPE, itemTypeSchema);
const user         = mongoose.model(modelName.USER, userSchema);
const item         = mongoose.model(modelName.ITEM, itemSchema);
const sesion       = mongoose.model(modelName.SESION, sesionSchema);
const socialNetworkLink   = mongoose.model(modelName.SOCIAL_NETWORKS_LINK, socialNetworkLinkSchema);
const wink         = mongoose.model(modelName.WINK, winkSchema);

execute();

// creacion de las semillas
async  function up() {
    console.log('SEEDING THE DATABASE');
    await category.insertMany(categoriesSeed);
    await itemType.insertMany(itemTypesSeed);
    const data = setIdsToArray(usersSeed);
    const usersItemswithId = setUserIdToItems(usersItemsSeed, data.ids);
    await user.insertMany(data.dataWithId);
    await item.insertMany(usersItemswithId);
    await socialNetworkLink.insertMany(socialNetworkLinksSeed);
}

/*
// limpiar modelos
async  function down(conn) {
    console.log('CLEANING MODELS');
    for ( const  model of [category, itemType, user, item, sesion, socialNetworkLink, wink] ) {
        try {
            await model.collection.drop();
        } catch (e) {
            if (e.code === 26) {
            console.log('namespace %s not found', model.collection.name );
            } else {
            throw e;
            }
        }
    }
}
*/

async function closeConn() {
    console.log('CLOSING CONNECTION WITH DB');
    await mongoose.connection.close();
}

async function openConn() {
    console.log('OPENING CONNECTION WITH DB');
    const conn = await mongoose.connect(
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
            { useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true },
            );
    console.log('DROPPING EXISTING DATA');
    await conn.connection.dropDatabase();
}

function setIdsToArray(dataArray: any[]) {
    const ids = [];
    const dataWithId = dataArray.map( (data, index) => {
        ids[index] = new ObjectId();
        return Object.assign(data, {_id: ids[index]});
    });
    return {ids, dataWithId};
}

function setUserIdToItems(items: any[], ids: any[]) {
    return ids.flatMap(id => items.map( it => Object.assign({}, it, {user_id: id})));
}

// ejecutar  los metodos down y up respectivamente
async function execute() {
    try {
        await openConn();
        await up();
        await closeConn();
        console.log('ALL DONE...');

    } catch (e) {
        console.log(e);
        await closeConn();
    }
}
