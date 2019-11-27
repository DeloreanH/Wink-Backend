import { IsString, IsMongoId, IsNotEmpty, IsDate } from 'class-validator';

export class sesionDTO {
   @IsNotEmpty()
   @IsString()
   @IsMongoId()
   readonly user_id: string;

   @IsNotEmpty()
   @IsString()
   readonly serverToken: string;

   @IsNotEmpty()
   @IsString()
   readonly token: string;

   @IsNotEmpty()
   @IsDate()
   readonly expireAt: any;
}
