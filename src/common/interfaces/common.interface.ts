import {User } from '../../user/interfaces/user.interface';

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
