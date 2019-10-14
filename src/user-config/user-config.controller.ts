import { Controller, Get } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { Category, itemType } from 'src/shared/interfaces/interfaces';

@Controller('user-config')
export class UserConfigController {
    constructor(private uconfigServ: UserConfigService) {}

    @Get('categories')
    getCategories(): Promise<Category[]> {
        return this.uconfigServ.getCategories();
    }

    @Get('itemtypes')
    getItemTypes(): Promise<itemType[]> {
        return this.uconfigServ.getItemTypes();
    }
}
