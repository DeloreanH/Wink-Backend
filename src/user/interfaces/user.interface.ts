import { Document } from 'mongoose';
import { Gender } from 'src/enums/enums';

export interface User extends Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
    birthday?: string | string;
    gender?: Gender;
    avatarUrl?: string;
    status?: string;
    description?: string;
    emptyUser?: boolean;
    username?: string;
    created?: Date;
    updated?: Date;
}

export interface Log extends Document {
    useId: string;
    created: Date;
    updated: Date;
}
export interface Phone {
    phoneCode?: number;
    phoneNumber?: number;
}
