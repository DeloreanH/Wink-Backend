import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
export class winkUserIdDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly winkUserId: string;
 }
