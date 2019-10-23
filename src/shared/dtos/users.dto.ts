import { IPhone } from '../interfaces/interfaces';

export class UserDTO {
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
   readonly username?: string;
   readonly autosave?: boolean;
   readonly location?: {
      type: string,
      coordinates: [],
   };
   readonly created?: Date;
   readonly updated?: Date;

}
