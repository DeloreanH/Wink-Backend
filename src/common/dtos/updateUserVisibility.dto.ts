import { IsNotEmpty, IsString } from 'class-validator';

export class updateUserVisibilitysDTO {
    @IsNotEmpty()
    @IsString()
    readonly visibility: string;
 }
