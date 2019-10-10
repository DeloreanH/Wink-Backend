import { Phone } from '../interfaces/user.interface';
export class UserDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: Phone;
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
