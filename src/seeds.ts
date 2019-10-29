import 'dotenv/config';
import * as mongoose from 'mongoose';
import { itemTypeSchema } from './database/schemas/item-type.schema';
import { CategorySchema } from './database/schemas/category.schema';
import { userSchema } from './database/schemas/user.schema';
import { modelName } from './database/models-name';
import * as itemsObj from './database/pre-build-data/itemsDefault.json';
import { IUser } from './common/interfaces/interfaces';
import { itemSchema } from './database/schemas/item.schema';
import { sesionSchema } from './database/schemas/sesion.schema';

// establecer nombre de la base de datos, el config del host se encuentra en el env
mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// modelos a sedear
const Category = mongoose.model(modelName.CATEGORY, CategorySchema);
const itemType = mongoose.model(modelName.ITEM_TYPE, itemTypeSchema);
const User     = mongoose.model(modelName.USER, userSchema);
const Item     = mongoose.model(modelName.USER, itemSchema);
const Sesion   = mongoose.model(modelName.SESION, sesionSchema);

// data
const categoriesArray = [
    {
        name: 'contacto',
        description: 'Contacto',
    },
    {
        name: 'educacion',
        description: 'Educación',
    },
    {
        name: 'laboral',
        description: 'Laboral',
    },
    {
        name: 'mensajeria',
        description: 'Mensajería',
    },
    {
        name: 'personal',
        description: 'Personal',
    },
    {
        name: 'redessociales',
        description: 'Redes Sociales',
    },
    {
        name: 'otros',
        description: 'otros',
    },
];
const itemTypesArray = [
    {
        name: 'celular',
        description: 'Celular',
        icon: 'fas mobile-alt',
        index: '6',
        category: 'contacto',
        repeat: true,
    },
    {
        name: 'correo',
        description: 'Correo',
        icon: 'fas envelope',
        index: '1',
        category: 'contacto',
        repeat: true,
    },
    {
        name: 'sitioweb',
        description: 'Sitio Web',
        icon: 'fas at',
        index: '3',
        category: 'contacto',
        repeat: true,
    },
    {
        name: 'telefono',
        description: 'Telefono',
        icon: 'fas phone',
        index: '6',
        category: 'contacto',
        repeat: true,
    },
    {
        name: 'niveldeinstruccion',
        description: 'Nivel de instrucción',
        icon: 'fas bookmark',
        index: '4',
        category: 'educacion',
        repeat: true,
        options: [
            {name: 'Primaria'},
            {name: 'Secundaria'},
            {name: 'Media Superior'},
            {name: 'Superior'},
        ],
    },
    {
        name: 'profesion',
        description: 'Profesión',
        icon: 'fas graduation-cap',
        index: '0',
        category: 'educacion',
        repeat: true,
    },
    {
        name: 'universidad',
        description: 'Universidad',
        icon: 'fas university',
        index: '0',
        category: 'educacion',
        repeat: true,
    },
    {
        name: 'linkedin',
        description: 'LinkedIn',
        icon: 'fab linkedin',
        index: '0',
        category: 'laboral',
        repeat: true,
    },
    {
        name: 'ocupacion',
        description: 'Ocupación',
        icon: 'fas briefcase',
        index: '0',
        category: 'laboral',
        repeat: false,
    },
    {
        name: 'trabajo',
        description: 'Trabajo',
        icon: 'fas city',
        index: '2',
        category: 'laboral',
        repeat: true,
    },
    {
        name: 'apodo',
        description: 'Apodo',
        icon: 'fas user',
        index: '0',
        category: 'personal',
        repeat: false,
    },
    {
        name: 'direccion',
        description: 'Dirección',
        icon: 'fas map-marker-alt',
        index: '0',
        category: 'personal',
        repeat: false,
    },
    {
        name: 'estadocivil',
        description: 'Estado civil',
        icon: 'fas heart',
        index: '4',
        repeat: false,
        category: 'personal',
        options: [
            {name: 'Casado/a'},
            {name: 'Comprometido/a'},
            {name: 'Divorciado/a'},
            {name: 'En Relación'},
            {name: 'Noviazgo'},
            {name: 'Separado/a'},
            {name: 'Soltero/a'},
            {name: 'Viudo/a'},
        ],
    },
    {
        name: 'fechadenacimiento',
        description: 'Fecha de nacimiento',
        icon: 'fas calendar-alt',
        index: '5',
        category: 'personal',
        repeat: false,
    },
    {
        name: 'hobbies',
        description: 'Hobbies',
        icon: 'fas star',
        index: '8',
        category: 'personal',
        repeat: false,
    },
    {
        name: 'intereses',
        description: 'Intereses',
        icon: 'fas thumbs-up',
        index: '8',
        category: 'personal',
        repeat: false,
    },
    {
        name: 'facebook',
        description: 'Facebook',
        icon: 'fab facebook-square',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'instagram',
        description: 'Instagram',
        icon: 'fab instagram',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'medium',
        description: 'Medium',
        icon: 'fab medium',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'pinterest',
        description: 'Pinterest',
        icon: 'fab pinterest',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'reddit',
        description: 'Reddit',
        icon: 'fab reddit',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'snapchat',
        description: 'Snapchat',
        icon: 'fab snapchat',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'tumblr',
        description: 'Tumblr',
        icon: 'fab tumblr',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'twitter',
        description: 'Twitter',
        icon: 'fab twitter',
        index: '0',
        category: 'redessociales',
        repeat: true,
    }, {
        name: 'youtube',
        description: 'YouTube',
        icon: 'fab youtube',
        index: '0',
        category: 'redessociales',
        repeat: true,
    },
    {
        name: 'line',
        description: 'Line',
        icon: 'fab line',
        index: '0',
        category: 'mensajeria',
        repeat: true,
    },
    {
        name: 'skype',
        description: 'Skype',
        icon: 'fab skype',
        index: '0',
        category: 'mensajeria',
        repeat: true,
    },
    {
        name: 'telegram',
        description: 'Telegram',
        icon: 'fab telegram',
        index: '6',
        category: 'mensajeria',
        repeat: true,
    },
    {
        name: 'wechat',
        description: 'Wechat',
        icon: 'fab weixin',
        index: '0',
        category: 'mensajeria',
        repeat: true,
    },
    {
        name: 'whatsapp',
        description: 'WhatsApp',
        icon: 'fab whatsapp',
        index: '6',
        category: 'mensajeria',
        repeat: true,
    },
    {
        name: 'personalizado',
        description: 'Personalizado',
        icon: 'fas asterisk',
        index: '7',
        category: 'otros',
        repeat: true,
    },
];
const usersArray = [
    {
        firstName: 'John',
        lastName: 'Doe',
        phone: {
            phoneCode: 424,
            phoneNumber: 5529897,
        },
        gender: 'masculino',
        emptyProfile: false,
        visibility: 'todos',
        avatarUrl: 'https://image.flaticon.com/icons/png/512/206/206853.png',
        email: 'john@doe.com',
        birthday: null,
        username: 'johndoe123',
        location: {
            type: 'Point',
            coordinates: [-63.2033518 , 9.8000694],
        },
    },
    {
        firstName: 'Maria',
        lastName: 'Lopez',
        phone: {
            phoneCode: 412,
            phoneNumber: 2224546,
        },
        gender: 'femenino',
        emptyProfile: false,
        visibility: 'todos',
        avatarUrl: 'https://icstravelgroup.com/wp-content/uploads/2017/07/icstravelgroup_clients_icons00002.png',
        email: 'maria@lopez.com',
        birthday: null,
        username: 'marialopez5656',
        location: {
            type: 'Point',
            coordinates:  [-63.208184 , 9.8024069],
        },
    },
    {
        firstName: 'Eric',
        lastName: 'Cartman',
        phone: {
            phoneCode: 412,
            phoneNumber: 6626667,
        },
        gender: 'masculino',
        emptyProfile: false,
        visibility: 'todos',
        avatarUrl: 'https://i.pinimg.com/originals/8f/22/d3/8f22d32f54c8d0dd4087b1007af00353.jpg',
        email: 'eric@cartman.com',
        birthday: null,
        username: 'eric1414',
        location: {
            type: 'Point',
            coordinates: [-63.1991684 , 9.7842392],
        },
    },
];

// creacion de las semillas
async  function up() {
    console.log('SEEDING THE DATABASE');
    await Category.insertMany(categoriesArray);
    await itemType.insertMany(itemTypesArray);
    await User.insertMany(usersArray);

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

// ejecutar  los metodos down y up respectivamente
async function execute() {
    try {
        await down();
        await up();
        close();
        console.log('ALL DONE...');

    } catch (e) {
        console.log(e);
        close();
    }
}

execute();
