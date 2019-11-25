import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateNested, IsOptional, IsEmail, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

import { IPhone } from '../interfaces/interfaces';

export class UserDTO {
   @IsOptional()
   @IsString()
   readonly firstName?: string;

   @IsOptional()
   @IsString()
   readonly lastName?: string;

   @IsOptional()
   @IsEmail()
   readonly email?: string;

   @ValidateNested()
    @Type(() => Phone)
   readonly phone?: Phone;

   @IsOptional()
   @IsDateString()
   readonly birthday?: string;

   @IsOptional()
   @IsString()
   readonly gender?: string;

   @IsOptional()
   @IsString()
   readonly avatarUrl?: string;

   @IsOptional()
   @IsString()
   readonly status?: string;

   @IsOptional()
   @IsString()
   readonly description?: string;

   @IsOptional()
   @IsBoolean()
   readonly emptyUser?: boolean;

   @IsOptional()
   @IsString()
   readonly visibility?: string;

   @IsOptional()
   @IsString()
   readonly username?: string;

   @IsOptional()
   @IsBoolean()
   readonly autosave?: boolean;

   @ValidateNested()
   @Type(() => Location)
   readonly location?: Location;
}

// tslint:disable-next-line: max-classes-per-file
class Phone {
   @IsNumber()
   phoneCode: number;

   @IsNumber()
   phoneNumber: number;
}
// tslint:disable-next-line: max-classes-per-file
class Location {
   phoneCode?: number;
   phoneNumber?: number;
}
