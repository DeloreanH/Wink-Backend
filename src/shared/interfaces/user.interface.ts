import { Document } from 'mongoose';

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
