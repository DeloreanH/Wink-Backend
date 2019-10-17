import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { ICategory, IItemType, IItem } from '../shared/interfaces/interfaces';
import { AuthUser } from '../shared/decorators/auth-decorators.decorator';
import { itemDTO } from 'src/shared/dtos/item.dto';

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
    @Get('items/user/:id')
    getUserItems(@Param('id') id): Promise<IItem[]>  {
        return this.uconfigServ.getItemsByUserId(id);
    }

    @Post('items/user/create')
    async createItemsForUser(@AuthUser('_id') id, @Body() items: itemDTO[] ): Promise<IItem[]>  {
        await this.uconfigServ.deleteManyItemsToUser(id);
        return await this.uconfigServ.createManyItemsToUser(items);
    }

}
