import { Document } from 'mongoose';

export interface Category extends Document {
    _id: string;
    name: number;
    created: Date;
}

export interface itemType extends Document {
    _id: string;
    description: string;
    index: number;
    repeat: boolean;
    category_id: string;
    options: Array<{ _id: string, name: string}>;
    created: Date;
}

export interface User extends Document {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    birthday?: string;
    gender?: string;
    avatarUrl?: string;
    status?: string;
    description?: string;
    emptyProfile?: boolean;
    username?: string;
    created?: Date;
    updated?: Date;
}
export interface Phone {
    phoneCode?: number;
    phoneNumber?: number;
}

export interface Log extends Document {
    userId: string;
    created: Date;
    updated: Date;
}

export interface Payload {
    exp: number;
    iat: number;
    sub: Sub;
}

export interface Sub extends User {
    provider?: string;
}

export interface authResponse {
    token: string;
    exp: number;
    emptyProfile: boolean;
}


