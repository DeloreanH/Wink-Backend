import { Controller, Get, Param, Post, Body, Put, HttpException, HttpStatus, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import { ICategory, IItemType, IItem, IUser } from '../../common/interfaces/interfaces';
import { AuthUser } from '../../common/decorators/auth-decorators.decorator';
import { itemDTO } from '../../shared/dtos/item.dto';
import { UserDTO } from '../../shared/dtos/users.dto';
import { UserService } from '../../shared/services/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { setMulterOptions } from '../../common/tools/multer.config';
import { unlinkSync, existsSync } from 'fs';
import { ItemService } from '../../shared/services/item.service';

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
    @Get('items/user/:id')
    getUserItems(@Param('id') id): Promise<IItem[]>  {
        return this.itemServ.getItemsByUserId(id);
    }

    @Post('items/user/create')
    async createItemsForUser(@AuthUser('_id') id, @Body() items: itemDTO[] ): Promise<IItem[]>  {
        await this.itemServ.deleteManyItemsToUser(id);
        return await this.itemServ.createManyItemsToUser(items);
    }
    @Put('user/update/basic-data')
    async update(@AuthUser() authUser: IUser, @Body() userValues: UserDTO, @Res() res) {
        try {
            const toUpdate = Object.assign(userValues, {emptyProfile: false});
            const user = await this.userServ.findByIdAndUpdate(authUser._id, toUpdate);
            return res.status(HttpStatus.OK).json({
                status: 'user updated successfully',
                user,
             });
       } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
       }
    }

    @Post('user/upload/avatar')
    @UseInterceptors(FileInterceptor('avatar', setMulterOptions(10485760, process.env.AVATAR_UPLOAD_PATH, 'jpg|jpeg|png|gif')))
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
                const link = process.env.APP_URL + ':' + process.env.PORT + '/' + process.env.AVATAR_UPLOAD_PATH + '/' + file.filename;
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
