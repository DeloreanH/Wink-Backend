import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateNested, IsOptional, IsEmail, IsDateString, Equals } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDTO, PhoneDTO } from '@app/common/dtos';

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
    @Type(() => PhoneDTO)
   readonly phone?: PhoneDTO;

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
   @Type(() => LocationDTO)
   readonly location?: LocationDTO;
}
