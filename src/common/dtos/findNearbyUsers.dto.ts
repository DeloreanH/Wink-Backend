import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class findNearbyUsersDTO {
    @IsNotEmpty()
    @IsNumber()
    readonly latitude: number;

    @IsNotEmpty()
    @IsNumber()
    readonly longitude: number;

    @IsOptional()
    @IsNumber()
    readonly sort?: number;
 }
