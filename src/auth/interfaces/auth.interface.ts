import { Document } from 'mongoose';
import {User } from '../../shared/interfaces/user.interface';

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
