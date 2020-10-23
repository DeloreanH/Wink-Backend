import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelNameDevicesTokens } from '../database';
import { IDevicesTokens } from '../interfaces';

@Injectable()
export class DevicesTokensService {

    constructor(
        @InjectModel(modelNameDevicesTokens.DEVICES_TOKENS) private devicesTokensModel: Model<IDevicesTokens>,
      ) {}

      async updateDeviceToken(userId: string, token: string) {
        return await this.devicesTokensModel.update({ userId }, {userId, token}, {upsert: true});
      }
}
