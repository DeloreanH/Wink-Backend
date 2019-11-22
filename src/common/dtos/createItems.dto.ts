import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDTO } from './item.dto';

export class CreateItemsDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDTO)
    items: ItemDTO[];
}
