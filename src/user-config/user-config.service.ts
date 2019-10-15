import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { ICategory, IItemType, IItem } from 'src/shared/interfaces/interfaces';
import { itemDTO } from 'src/shared/dtos/item.dto';

@Injectable()
export class UserConfigService {
    private basicItems = []
    constructor(
        @InjectModel('Category') private categoryModel: Model<ICategory>,
        @InjectModel('ItemType') private itemTypeModel: Model<IItemType>,
        @InjectModel('Item') private itemModel: Model<IItem>,
        ) {}

    public async getCategories(): Promise<ICategory[]> {
        return await this.categoryModel.find({});
    }
    public async getCategoriesWithItems(): Promise<ICategory[]> {
        return await this.categoryModel.find({}).populate('itemtypes');
    }
    public async getItemTypes(): Promise<IItemType[]> {
        return await this.itemTypeModel.find({});
    }
    public async setBasicItemsToUser( userId: string ): Promise<any[]> {
        const basicItems: itemDTO[] = [
            {
                user_id: userId,
                itemtype: 'fechadenacimiento',
                position: 1,
                basic: true,
                custom: null,
                section: {
                    name: 'Publico',
                    key: 0,
                },
            },
            {
                user_id: userId,
                itemtype: 'intereses',
                position: 2,
                basic: true,
                custom: null,
                section: {
                    name: 'Publico',
                    key: 0,
                },
            },
            {
                user_id: userId,
                itemtype: 'whatsapp',
                position: 1,
                basic: true,
                custom: null,
                section: {
                    name: 'General',
                    key: 1,
                },
            },
            {
                user_id: userId,
                itemtype: 'facebook',
                position: 2,
                basic: true,
                custom: null,
                section: {
                    name: 'General',
                    key: 1,
                },
            },
            {
                user_id: userId,
                itemtype: 'correo',
                position: 3,
                basic: true,
                custom: null,
                section: {
                    name: 'General',
                    key: 1,
                },
            },
            {
                user_id: userId,
                itemtype: 'instagram',
                position: 4,
                basic: true,
                custom: null,
                section: {
                    name: 'General',
                    key: 1,
                },
            },
            {
                user_id: userId,
                itemtype: 'hobbies',
                position: 1,
                basic: true,
                custom: null,
                section: {
                    name: 'Personal',
                    key: 2,
                },
            },
            {
                user_id: userId,
                itemtype: 'celular',
                position: 2,
                basic: true,
                custom: null,
                section: {
                    name: 'Personal',
                    key: 2,
                },
            },
            {
                user_id: userId,
                itemtype: 'direccion',
                position: 3,
                basic: true,
                custom: null,
                section: {
                    name: 'Personal',
                    key: 2,
                },
            },
            {
                user_id: userId,
                itemtype: 'sitioweb',
                position: 4,
                basic: true,
                custom: null,
                section: {
                    name: 'Personal',
                    key: 2,
                },
            },
            {
                user_id: userId,
                itemtype: 'niveldeinstruccion',
                position: 1,
                basic: true,
                custom: null,
                section: {
                    name: 'Profesional',
                    key: 3,
                },
            },
            {
                user_id: userId,
                itemtype: 'ocupacion',
                position: 2,
                basic: true,
                custom: null,
                section: {
                    name: 'Profesional',
                    key: 3,
                },
            },
    ];
        return await  this.itemModel.insertMany(basicItems);
    }
}
