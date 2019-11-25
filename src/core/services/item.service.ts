import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/models-name';
import { Model } from 'mongoose';
import { IItemType, IItem, ICategory } from '../../common/interfaces/interfaces';
import { ObjectId } from 'bson';
import { CreateItemsDTO } from 'src/common/dtos/createItems.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(modelName.CATEGORY) private categoryModel: Model<ICategory>,
        @InjectModel(modelName.ITEM_TYPE) private itemTypeModel: Model<IItemType>,
        @InjectModel(modelName.ITEM) private itemModel: Model<IItem>,
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
    public async getItems(userId: string, params: any[]): Promise<IItem[]> {
        return await this.itemModel.aggregate([
            { $match: {user_id: new ObjectId(userId)}},
            { $match: {'section.key': {$in: params}}},
            { $sort : { position: 1}},
        ]);
    }
    public async deleteItemsToUser(id: string) {
        return await this.itemModel.deleteMany({user_id: id});
    }
    public async createItemsToUser(data: CreateItemsDTO): Promise<IItem[]> {
        return await this.itemModel.insertMany(data.items);
    }
}
