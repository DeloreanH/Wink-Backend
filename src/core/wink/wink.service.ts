import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '../../database/models-name';
import { Model } from 'mongoose';
import { IWink, ISocialLink} from '../../common/interfaces/interfaces';
import { winkDTO } from './dtos/WinkDTO';

@Injectable()
export class WinkService {
    constructor(
        @InjectModel(modelName.WINK) private winkModel: Model<IWink>,
        @InjectModel(modelName.SOCIAL_NETWORKS_LINK) private socialNetworkLinkModel: Model<ISocialLink>,
        ) {}

        public async findByProperties(param: any[]): Promise<IWink> {
            return await this.winkModel.findOne({ $or: param });
        }
        public async createWink(wink: winkDTO): Promise<IWink> {
            return await this.winkModel.create(wink);
        }
        public async getSocialNetworksLinks(): Promise<ISocialLink[]> {
            return await this.socialNetworkLinkModel.find();
        }

}
