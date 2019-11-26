import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class winkDTO {
    @IsNotEmpty()
    @IsString()
    readonly sender_id: string;

    @IsNotEmpty()
    @IsString()
    readonly senderVisibility: string;

    @IsNotEmpty()
    @IsString()
    readonly receiver_id: string;

    @IsNotEmpty()
    @IsString()
    readonly receiverVisibility: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly approved: boolean;

    @IsOptional()
    @IsBoolean()
    readonly watched?: boolean;
 }
