import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class winkIdDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly wink_id: string;
 }
