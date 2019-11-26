import { IsNotEmpty, IsString } from 'class-validator';

export class winkIdDTO {
    @IsNotEmpty()
    @IsString()
    readonly wink_id: string;
 }
