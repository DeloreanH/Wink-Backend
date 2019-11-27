import { IsNotEmpty, IsString } from 'class-validator';
export class showPrivateProfileDTO {
    @IsNotEmpty()
    @IsString()
    readonly wink_id: string;

    @IsNotEmpty()
    @IsString()
    readonly winkUserId: string;
 }
