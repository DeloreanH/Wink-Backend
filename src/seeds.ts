import * as mongoose from 'mongoose';
import { itemTypeSchema } from './shared/schemas/item-type.schema';
import { CategorySchema } from './shared/schemas/category.schema';

mongoose.connect('mongodb://localhost/nest');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Category = mongoose.model('Category', CategorySchema);
const itemType = mongoose.model('itemType', itemTypeSchema);

const categoriesArray = [
    {
        name: 'Contacto',
        items: [
            {
                description: 'Celular',
                icono: 'fas mobile-alt',
                index: '6',
                category_id: null,
            },
            {
                description: 'Correo',
                icono: 'fas envelope',
                index: '1',
                category_id: null,
            },
            {
                description: 'Sitio Web',
                icono: 'fas at',
                index: '3',
                category_id: null,
            },
            {
                description: 'Sitio Web',
                icono: 'fas at',
                index: '3',
                category_id: null,
            },
            {
                description: 'Telefono',
                icono: 'fas phone',
                index: '6',
                category_id: null,
            },
        ],
    },
    {
        name: 'Educación',
        items: [
            {
                description: 'Nivel de instrucción',
                icono: 'fas bookmark',
                index: '4',
                category_id: null,
            },
            {
                description: 'Profesión',
                icono: 'fas graduation-cap',
                index: '0',
                category_id: null,
            },
            {
                description: 'Universidad',
                icono: 'fas university',
                index: '0',
                category_id: null,
            },
        ],
    },
    {
        name: 'Laboral',
        items: [
            {
                description: 'LinkedIn',
                icono: 'fab linkedin',
                index: '0',
                category_id: null,
            },
            {
                description: 'Ocupación',
                icono: 'fas briefcase',
                index: '0',
                category_id: null,
            },
            {
                description: 'Trabajo',
                icono: 'fas city',
                index: '2',
                category_id: null,
            },
        ],
    },
    {
        name: 'Mensajería',
        items: [
            {
                description: 'Line',
                icono: 'fab line',
                index: '0',
                category_id: null,
            },
            {
                description: 'Skype',
                icono: 'fab skype',
                index: '0',
                category_id: null,
            },
            {
                description: 'Telegram',
                icono: 'fab telegram',
                index: '6',
                category_id: null,
            },
            {
                description: 'Wechat',
                icono: 'fab weixin',
                index: '0',
                category_id: null,
            },
            {
                description: 'WhatsApp',
                icono: 'fab whatsapp',
                index: '6',
                category_id: null,
            },
        ],
    },
    {
        name: 'Personal',
        items: [
            {
                description: 'Apodo',
                icono: 'fas user',
                index: '0',
                category_id: null,
            },
            {
                description: 'Dirección',
                icono: 'fas map-marker-alt',
                index: '0',
                category_id: null,
            },
            {
                description: 'Estado civil',
                icono: 'fas heart',
                index: '4',
                category_id: null,
            },
            {
                description: 'Fecha de nacimiento',
                icono: 'fas calendar-alt',
                index: '5',
                category_id: null,
            },
            {
                description: 'Hobbies',
                icono: 'fas star',
                index: '8',
                category_id: null,
            },
            {
                description: 'Intereses',
                icono: 'fas thumbs-up',
                index: '8',
                category_id: null,
            },
        ],
    },
    {
        name: 'Redes Sociales',
        items: [
            {
                description: 'Facebook',
                icono: 'fab facebook-square',
                index: '0',
                category_id: null,
            },
            {
                description: 'Instagram',
                icono: 'fab instagram',
                index: '0',
                category_id: null,
            },
            {
                description: 'Medium',
                icono: 'fab medium',
                index: '0',
                category_id: null,
            },
            {
                description: 'Pinterest',
                icono: 'fab pinterest',
                index: '0',
                category_id: null,
            },
            {
                description: 'Reddit',
                icono: 'fab reddit',
                index: '0',
                category_id: null,
            },
            {
                description: 'Snapchat',
                icono: 'fab snapchat',
                index: '0',
                category_id: null,
            },
            {
                description: 'Tumblr',
                icono: 'fab tumblr',
                index: '0',
                category_id: null,
            },
            {
                description: 'Twitter',
                icono: 'fab twitter',
                index: '0',
                category_id: null,
            }, {
                description: 'YouTube',
                icono: 'fab youtube',
                index: '0',
                category_id: null,
            },
        ],
    },
    {
        name: 'Otros',
        items: [
            {
                description: 'Personalizado',
                icono: 'fas asterisk',
                index: '7',
                category_id: null,
            },
        ],
    },
];

async  function up() {
   for (const category of categoriesArray) {
       const savedCategory = await Category.create(category);
       for (const item of category.items) {
        item.category_id = savedCategory._id;
        await itemType.create(item);
       }
   }
}
async  function down() {
 }

up();
