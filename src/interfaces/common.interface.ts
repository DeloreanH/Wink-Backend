import { Gender } from '../enums/enums';
import { Phone } from '../user/interfaces/user.interface';

export interface Payload {
    exp: number;
    iat: number;
    sub: Sub | any;
}

export interface Sub {
    appId: string;
    provider: string;
    created: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    avatarUrl?: string;
    birthday?: string;
    phone?: Phone;
}
