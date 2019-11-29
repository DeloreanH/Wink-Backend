import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelName } from '@app/database/enums';
import { IWink, ISocialLink} from '@app/common/interfaces';
import { winkDTO } from '@app/common/dtos';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';

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
        public async findById(id: string): Promise<IWink> {
            return await this.winkModel.findById(id);
        }
        public async findByIdOrFail(id: string): Promise<IWink> {
            const wink = await this.winkModel.findById(id);
            if (!wink) {
                throw new HttpException('Wink not found', HttpStatus.NOT_FOUND);
            } else {
                return wink;
            }
        }
        public async findByIdAndUpdate(id: string, data: {watched: boolean} ): Promise<IWink> {
            return await this.winkModel.findOneAndUpdate({_id: id}, data, {new: true} );
        }
        public async getUserWinks(id: string): Promise<any> {
            return await this.winkModel.aggregate([
                {
                    $match:
                    {
                        $or:
                            [
                                { receiver_id: new ObjectId(id) },
                                { sender_id: new ObjectId(id) },
                            ],
                    },
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        let: { sender: '$sender_id', receiver: '$receiver_id' },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $or:
                                            [
                                                {
                                                    $and: [
                                                        { $eq: ['$_id', '$$sender'] },
                                                        { $ne: ['$_id', new ObjectId(id)] },
                                                    ],
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ['$_id', '$$receiver'] },
                                                        { $ne: ['$_id', new ObjectId(id)] },
                                                    ],
                                                },
                                            ],
                                    },
                                },
                            },
                        ],
                        as: 'user',
                    },
                },
                { $sort : { updatedAt : -1 } },
            ]);
        }
}
