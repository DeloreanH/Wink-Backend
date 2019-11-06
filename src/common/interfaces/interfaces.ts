import { Document} from 'mongoose';

export interface ICategory extends Document {
    name: number;
    itemType?: IItemType;
    created: Date;
}

export interface IItemType extends Document {
    description: string;
    index: number;
    repeat: boolean;
    category: string;
    options: Array<{ _id: string, name: string}>;
    created: Date;
}

export interface IItem extends Document {
    user_id: string;
    itemtype: string;
    value?: string;
    position: number;
    basic: boolean;
    custom: string;
    section: ISection;
    created: Date;
}
export interface ISection extends Document {
    name: string;
    key: number;
}

export interface IWink extends Document {
    sender_id: string;
    senderVisibility: string;
    receiver_id: string;
    receiverVisibility: string;
    approved: boolean;
}


export interface ISocialLink extends Document {
    _id: string;
    name: string;
    url: string;
    complement: string;
}
export interface IUser extends Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: IPhone;
    birthday?: string;
    gender?: string;
    avatarUrl?: string;
    status?: string;
    description?: string;
    emptyProfile?: boolean;
    username?: string;
    visibility?: string;
    autosave?: boolean;
    location?: {
       type: string,
       coordinates: [number, number],
    };
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IPhone {
    phoneCode?: number;
    phoneNumber?: number;
}

export interface ISesion extends Document {
    user_id: string;
    serverToken: string;
    token: string;
    blacklist: boolean;
    expireAt: Date;
    created: Date;
}

export interface IPayload {
    exp: number;
    iat: number;
    sub: ISub;
}

export interface ISub extends IUser {
    provider?: string;
}

export interface IAuthResponse {
    token: string;
    exp: number;
    user?: IUser;
    emptyProfile?: boolean;
}
