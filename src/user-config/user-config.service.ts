import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Category, itemType } from 'src/shared/interfaces/interfaces';

@Injectable()
export class UserConfigService {
    constructor(
        @InjectModel('Category') private categoryModel: Model<Category>,
        @InjectModel('ItemType') private itemTypeModel: Model<itemType>,
        ) {}

    public async getCategories(): Promise<Category[]> {
        return await this.categoryModel.find();
    }
    public async getItemTypes(): Promise<itemType[]> {
        return await this.itemTypeModel.find();
    }
}
