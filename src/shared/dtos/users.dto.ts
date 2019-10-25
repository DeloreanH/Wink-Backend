import { IPhone } from '../../common/interfaces/interfaces';

export class UserDTO {
   readonly _id?: string;
   readonly firstName?: string;
   readonly lastName?: string;
   readonly email?: string;
   readonly phone?: IPhone;
   readonly birthday?: string;
   readonly gender?: string;
   readonly avatarUrl?: string;
   readonly status?: string;
   readonly description?: string;
   readonly emptyUser?: boolean;
   readonly visibility?: string;
   readonly username?: string;
   readonly autosave?: boolean;
   readonly location?: {
      type: string,
      coordinates: [number, number],
   };
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
}
