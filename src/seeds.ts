import 'dotenv/config';
import * as mongoose from 'mongoose';
import { itemTypeSchema } from './shared/schemas/item-type.schema';
import { CategorySchema } from './shared/schemas/category.schema';

// establecer nombre de la base de datos, el config del host se encuentra en el env
mongoose.connect(process.env.MONGO_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// modelos a sedear
const Category = mongoose.model('Category', CategorySchema);
const itemType = mongoose.model('itemType', itemTypeSchema);

// data
const categoriesArray = [
    {
        _id: '1',
        name: 'Contacto',
        items: [
            {
                _id: '1',
                description: 'Celular',
                icono: 'fas mobile-alt',
                index: '6',
                repeat: true,
                category_id: '1',
            },
            {
                _id: '2',
                description: 'Correo',
                icono: 'fas envelope',
                index: '1',
                repeat: true,
                category_id:  '1',
            },
            {
                _id: '3',
                description: 'Sitio Web',
                icono: 'fas at',
                index: '3',
                repeat: true,
                category_id:  '1',
            },
            {
                _id: '4',
                description: 'Sitio Web',
                icono: 'fas at',
                index: '3',
                repeat: true,
                category_id:  '1',
            },
            {
                _id: '5',
                description: 'Telefono',
                icono: 'fas phone',
                index: '6',
                repeat: true,
                category_id:  '1',
            },
        ],
    },
    {
        _id: '2',
        name: 'Educación',
        items: [
            {
                _id: '6',
                description: 'Nivel de instrucción',
                icono: 'fas bookmark',
                index: '4',
                repeat: true,
                options: [
                    {name: 'Primaria'},
                    {name: 'Secundaria'},
                    {name: 'Media Superior'},
                    {name: 'Superior'},
                ],
                category_id:  '2',
            },
            {
                _id: '7',
                description: 'Profesión',
                icono: 'fas graduation-cap',
                index: '0',
                repeat: true,
                category_id:  '2',
            },
            {
                _id: '8',
                description: 'Universidad',
                icono: 'fas university',
                index: '0',
                repeat: true,
                category_id:  '2',
            },
        ],
    },
    {
        _id: '3',
        name: 'Laboral',
        items: [
            {
                _id: '9',
                description: 'LinkedIn',
                icono: 'fab linkedin',
                index: '0',
                repeat: true,
                category_id:  '3',
            },
            {
                _id: '10',
                description: 'Ocupación',
                icono: 'fas briefcase',
                index: '0',
                repeat: false,
                category_id:  '3',
            },
            {
                _id: '11',
                description: 'Trabajo',
                icono: 'fas city',
                index: '2',
                repeat: true,
                category_id:  '3',
            },
        ],
    },
    {
        _id: '4',
        name: 'Mensajería',
        items: [
            {
                _id: '12',
                description: 'Line',
                icono: 'fab line',
                index: '0',
                repeat: true,
                category_id:  '4',
            },
            {
                _id: '13',
                description: 'Skype',
                icono: 'fab skype',
                index: '0',
                repeat: true,
                category_id:  '4',
            },
            {
                _id: '14',
                description: 'Telegram',
                icono: 'fab telegram',
                index: '6',
                repeat: true,
                category_id:  '4',
            },
            {
                _id: '15',
                description: 'Wechat',
                icono: 'fab weixin',
                index: '0',
                repeat: true,
                category_id:  '4',
            },
            {
                _id: '16',
                description: 'WhatsApp',
                icono: 'fab whatsapp',
                index: '6',
                repeat: true,
                category_id:  '4',
            },
        ],
    },
    {
        _id: '5',
        name: 'Personal',
        items: [
            {
                _id: '17',
                description: 'Apodo',
                icono: 'fas user',
                index: '0',
                repeat: false,
                category_id:  '5',
            },
            {
                _id: '18',
                description: 'Dirección',
                icono: 'fas map-marker-alt',
                index: '0',
                repeat: false,
                category_id:  '5',
            },
            {
                _id: '19',
                description: 'Estado civil',
                icono: 'fas heart',
                index: '4',
                repeat: false,
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
                category_id:  '5',
            },
            {
                _id: '20',
                description: 'Fecha de nacimiento',
                icono: 'fas calendar-alt',
                index: '5',
                repeat: false,
                category_id:  '5',
            },
            {
                _id: '21',
                description: 'Hobbies',
                icono: 'fas star',
                index: '8',
                repeat: false,
                category_id:  '5',
            },
            {
                _id: '22',
                description: 'Intereses',
                icono: 'fas thumbs-up',
                index: '8',
                repeat: true,
                category_id:  '5',
            },
        ],
    },
    {
        _id: '6',
        name: 'Redes Sociales',
        items: [
            {
                _id: '23',
                description: 'Facebook',
                icono: 'fab facebook-square',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '24',
                description: 'Instagram',
                icono: 'fab instagram',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '25',
                description: 'Medium',
                icono: 'fab medium',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '26',
                description: 'Pinterest',
                icono: 'fab pinterest',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '27',
                description: 'Reddit',
                icono: 'fab reddit',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '28',
                description: 'Snapchat',
                icono: 'fab snapchat',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '29',
                description: 'Tumblr',
                icono: 'fab tumblr',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
            {
                _id: '30',
                description: 'Twitter',
                icono: 'fab twitter',
                index: '0',
                repeat: true,
                category_id:  '6',
            }, {
                _id: '31',
                description: 'YouTube',
                icono: 'fab youtube',
                index: '0',
                repeat: true,
                category_id:  '6',
            },
        ],
    },
    {
        _id: '7',
        name: 'Otros',
        items: [
            {
                _id: '32',
                description: 'Personalizado',
                icono: 'fas asterisk',
                index: '7',
                repeat: true,
                category_id: '7',
            },
        ],
    },
];

// creacion de las semillas
async  function up() {
   for (const category of categoriesArray) {
       const savedCategory = await Category.create(category);
       for (const item of category.items) {
        item.category_id = savedCategory._id;
        await itemType.create(item);
       }
   }
}

// limpiar modelos
async  function down() {
    mongoose.connection.collection('categories').drop();
    mongoose.connection.collection('itemtypes').drop();
}

// ejecutar  los metodos down y up respectivamente
async function execute() {
    console.log('CLEANING THE MODELS');
    await down();

    console.log('SEEDING THE DATABASE');
    await up();

    console.log('CLOSING CONNECTION WITH DB');
    mongoose.connection.close();

    console.log('ALL DONE...');
}

execute();
