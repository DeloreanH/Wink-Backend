import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from 'src/database/models-name';
import { Model } from 'mongoose';
import { IWink} from '../../common/interfaces/interfaces';

@Injectable()
export class WinkService {
    constructor(
        @InjectModel(modelName.WINK) private winkModel: Model<IWink>,
        ) {}

        public async findByProperties(param: any[]): Promise<IWink> {
            return await this.winkModel.findOne({ $or: param });
        }
}
