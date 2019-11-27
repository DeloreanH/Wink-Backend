import { Controller, Get, Param, Post, Body, Put, HttpException, HttpStatus, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { ICategory, IItemType, IItem, IUser } from '../../common/interfaces/interfaces';
import { AuthUser } from '../../common/decorators/auth-decorators.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync, existsSync } from 'fs';
import { UserService } from '../../core/services/user.service';
import { ItemService } from '../../core/services/item.service';
import { CreateItemsDTO } from '../../common/dtos/createItems.dto';

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
    @Get('items-user')
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
        const user = await this.userServ.findById(id);
        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        } else {
            user.update(toUpdate);
            return res.status(HttpStatus.OK).json({
                status: 'user updated successfully',
                user,
            });
        }
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    async avatarUpload(@UploadedFile() file , @Res() res, @AuthUser() authUser: IUser): Promise<any>  {
        try {
            const user = await this.userServ.findById(authUser._id);
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
                await user.update({avatarUrl: link});
                return res.status(HttpStatus.OK).json({
                    status: 'avatar uploaded successfully',
                    link,
                 });
            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('user/avatar/:imagepath')
    seeUploadedFile(@Param('imagepath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads/avatar/'},
             (error) => {
                if (error) {
                    res.status(error.status).json({
                        status: 'resource not found',
                     });
                }
            },
        );
    }
}
