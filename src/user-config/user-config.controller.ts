import { Controller, Get } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { ICategory, IItemType } from 'src/shared/interfaces/interfaces';

@Controller('user-config')
export class UserConfigController {
    constructor(private uconfigServ: UserConfigService) {}

    @Get('categories')
    getCategories(): Promise<ICategory[]> {
        return this.uconfigServ.getCategories();
    }

    @Get('categories-items')
    getCategoriesWithItems(): Promise<ICategory[]> {
        return this.uconfigServ.getCategoriesWithItems();
    }
    @Get('itemtypes')
    getItemTypes(): Promise<IItemType[]> {
        return this.uconfigServ.getItemTypes();
    }
}
