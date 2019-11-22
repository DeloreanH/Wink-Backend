import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Section {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    key: number;
  }

// tslint:disable-next-line: max-classes-per-file
export class ItemDTO {

    @IsNotEmpty()
    @IsString()
    readonly user_id: string;

    @IsNotEmpty()
    @IsString()
    readonly itemtype: string;

    @IsNotEmpty()
    @IsString()
    readonly value?: string;

    @IsNotEmpty()
    @IsNumber()
    readonly position: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly basic: boolean;

    @IsNotEmpty()
    @IsString()
    readonly custom: string;

    @ValidateNested()
    @Type(() => Section)
    readonly section: Section;
}
