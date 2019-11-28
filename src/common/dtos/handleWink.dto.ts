import { IsNotEmpty, IsString, IsMongoId, IsBoolean } from 'class-validator';

export class handleWinkDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly wink_id: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly watch: boolean;
 }
