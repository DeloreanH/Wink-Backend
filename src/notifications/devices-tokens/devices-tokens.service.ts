import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { modelName } from '../database';
import { IDevicesTokens } from '../interfaces';

@Injectable()
export class DevicesTokensService {

    constructor(
        @InjectModel(modelName.DEVICES_TOKENS) private devicesTokensModel: Model<IDevicesTokens>,
      ) {}

      updateDeviceToken(userId: string, token: string) {
          this.devicesTokensModel.findOneAndUpdate({ userId }, { $addToSet: { token } });
      }
}
