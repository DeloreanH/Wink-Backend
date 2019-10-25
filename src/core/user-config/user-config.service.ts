import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { ICategory, IItemType, IItem } from '../../common/interfaces/interfaces';
import { itemDTO } from '../../shared/dtos/item.dto';

@Injectable()
export class UserConfigService {
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
    public async getItemsByUserId(id: string): Promise<IItem[]> {
        return await this.itemModel.find({user_id: id});
    }
    public async deleteManyItemsToUser(id: string) {
        return await this.itemModel.deleteMany({user_id: id});
    }
    public async createManyItemsToUser(items: itemDTO[]) {
        return await this.itemModel.insertMany(items);
    }
}
