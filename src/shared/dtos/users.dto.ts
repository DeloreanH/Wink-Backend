import { IPhone } from '../interfaces/interfaces';

export class UserDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: IPhone;
    birthday?: string;
    gender?: string;
    avatarUrl?: string;
    status?: string;
    description?: string;
    emptyUser?: boolean;
    username?: string;
    created?: Date;
    updated?: Date;
}
