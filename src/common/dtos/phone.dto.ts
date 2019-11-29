import { IsNumber } from 'class-validator';

export class PhoneDTO {
    @IsNumber()
    phoneCode?: number;

    @IsNumber()
    phoneNumber?: number;
 }
