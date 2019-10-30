import 'dotenv/config';
import * as mongoose from 'mongoose';
import { itemTypeSchema } from '../database/schemas/item-type.schema';
import { CategorySchema } from '../database/schemas/category.schema';
import { userSchema } from '../database/schemas/user.schema';
import { modelName } from '../database/models-name';
import { itemSchema } from '../database/schemas/item.schema';
import { sesionSchema } from '../database/schemas/sesion.schema';
import { ObjectId } from 'bson';

// data
import * as categoriesData from './data/categories.json';
import * as itemsTypesData from './data/itemTypes.json';
import * as usersData from './data/users.json';
import * as itemsDefaultData from './data/itemsDefault.json';
import { arrayExpression } from '@babel/types';

// modelos
const Category = mongoose.model(modelName.CATEGORY, CategorySchema);
const itemType = mongoose.model(modelName.ITEM_TYPE, itemTypeSchema);
const User     = mongoose.model(modelName.USER, userSchema);
const Item     = mongoose.model(modelName.ITEM, itemSchema);
const Sesion   = mongoose.model(modelName.SESION, sesionSchema);

// establecer nombre de la base de datos, el config del host se encuentra en el env
mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// creacion de las semillas
async  function up() {
    console.log('SEEDING THE DATABASE');
    //await Category.insertMany(categoriesData);
    //await itemType.insertMany(itemsTypesData);
    //await User.insertMany(usersData);
    const data = setIdsToArray(usersData);
    const data2 = setUserIdToItems(itemsDefaultData, data.ids);

    console.log(data2);

}

// limpiar modelos
async  function down() {
    console.log('CLEANING MODELS');
    for ( const  model of [Category, itemType, User, Item, Sesion] ) {
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

function close() {
    console.log('CLOSING CONNECTION WITH DB');
    mongoose.connection.close();
}

function setIdsToArray(dataArray: any[]) {
    const ids = [];
    const dataWithId = dataArray.map( (data, index) => {
        ids[index] = new ObjectId();
        return Object.assign(data, {_id: ids[index]});
    });
    return {ids, dataWithId};
}
function setUserIdToItems(itemsArray: any[], idsArray: any[]) {
    console.log(itemsArray);
    let data = [];
    for (const id of idsArray) {
        for (const item of itemsArray) {
            const newItem = Object.assign({}, item, {id});
            data.push(newItem);
            //console.log('newItem', newItem);
        }
    }
    console.log('data', data);
    return data;
}

function setUserIdToItems2(data: any[], items: any[]) {

    const storage = [];

    for (const item of items) {
        const copy = new Array(...data)
            .map(c => ({...c, id: item}));

        storage.push(...copy);
    }


   const data2 = items.map(id => data.map(d => Object.assign({}, d, {id})));


     console.log('data', data2);
    return data2;
}



// ejecutar  los metodos down y up respectivamente
async function execute() {
    try {
        //await down();
        await up();
        close();
        console.log('ALL DONE...');

    } catch (e) {
        console.log(e);
        close();
    }
}

execute();
