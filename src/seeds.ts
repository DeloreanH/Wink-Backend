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
        repeat: true,
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

// creacion de las semillas
async  function up() {
    await Category.insertMany(categoriesArray);
    await itemType.insertMany(itemTypesArray);
}

// limpiar modelos
async  function down() {
    for ( const  model of [Category, itemType] ) {
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
