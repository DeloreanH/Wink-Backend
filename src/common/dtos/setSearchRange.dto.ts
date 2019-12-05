import { IsNotEmpty, IsNumber, IsPositive, Min, Max } from 'class-validator';

export class setSearchRangDTO {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1000)
    @Max(8000000)
    readonly range: number;
 }
