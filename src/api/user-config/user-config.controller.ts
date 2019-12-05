import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    HttpException,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    Res,
} from '@nestjs/common';
import {
    ICategory,
    IItemType,
    IItem,
} from '@app/common/interfaces';
import { AuthUser } from '@app/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService, ItemService } from '@app/core/services';
import { CreateItemsDTO } from '@app/common/dtos';
import { unlinkSync, existsSync } from 'fs';

@Controller('user-config')
export class UserConfigController {
    constructor(private itemServ: ItemService, private userServ: UserService) {}

    @Get('categories')
    getCategories(): Promise<ICategory[]> {
        return this.itemServ.getCategories();
    }
    @Get('categories-items')
    getCategoriesWithItems(): Promise<ICategory[]> {
        return this.itemServ.getCategoriesWithItems();
    }
    @Get('itemtypes')
    getItemTypes(): Promise<IItemType[]> {
        return this.itemServ.getItemTypes();
    }
    @Get('items')
    getUserItems(@AuthUser('_id') id): Promise<IItem[]>  {
        return this.itemServ.getItemsByUserId(id);
    }
    @Post('items-create')
    async createItemsToUser(@AuthUser('_id') id, @Body() data: CreateItemsDTO): Promise<IItem[]>  {
        await this.itemServ.deleteItemsToUser(id);
        return await this.itemServ.createItemsToUser(data);
    }

    // dto para datos basicos no hecho, los inputs de esta ruta no estan validados, cuidado
    @Put('update-basic-data')
    async update(@AuthUser('_id') id: string, @Body() userValues, @Res() res) {
        const toUpdate = Object.assign(userValues, {emptyProfile: false});
        const user = await this.userServ.findByIdOrFail(id);
        await user.updateOne(toUpdate);
        return res.status(HttpStatus.OK).json({
            status: 'user updated successfully',
            user,
        });
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    async avatarUpload(@UploadedFile() file , @Res() res, @AuthUser('_id') id: string): Promise<any>  {
        try {
            const user = await this.userServ.findById(id);
            if (!user) {
                unlinkSync(file.path);
                const error = 'no user was found, new file was deleted';
                throw error;
            } else {
                if (user.avatarUrl !== '') {
                    const oldFilePath = process.env.AVATAR_UPLOAD_PATH + '/' + user.avatarUrl.split('/').pop();
                    if (existsSync(oldFilePath)) {
                        unlinkSync(oldFilePath);
                    }
                }
                const link = '/' + process.env.AVATAR_UPLOAD_PATH + '/' + file.filename;
                await user.updateOne({avatarUrl: link});
                return res.status(HttpStatus.OK).json({
                    status: 'avatar uploaded successfully',
                    link,
                 });
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
