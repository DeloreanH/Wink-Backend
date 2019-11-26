import { IsNotEmpty, IsString } from 'class-validator';
export class updateUserStatusDTO {
    @IsNotEmpty()
    @IsString()
    readonly status: string;
 }
