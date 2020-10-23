import { Document} from 'mongoose';

export interface IDevicesTokens extends Document {
    userId: string;
    token: string;
}
