import { Phone } from '../interfaces/user.interface';
import { Gender } from '../../enums/enums';

export class UserDTO {
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
