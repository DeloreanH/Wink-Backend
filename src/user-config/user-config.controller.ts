import { Controller, Get, Param, Post, Body, Put, HttpException, HttpStatus, UseInterceptors, UploadedFile, Res, Req } from '@nestjs/common';
import { UserConfigService } from './user-config.service';
import { ICategory, IItemType, IItem, IUser } from '../shared/interfaces/interfaces';
import { AuthUser } from '../shared/decorators/auth-decorators.decorator';
import { itemDTO } from 'src/shared/dtos/item.dto';
import { UserDTO } from 'src/shared/dtos/users.dto';
import { UserService } from 'src/shared/services/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { setMulterImageOptions } from 'src/shared/multer.config';
import { unlinkSync } from 'fs';

@Controller('user-config')
export class UserConfigController {
    constructor(private uconfigServ: UserConfigService, private userServ: UserService) {}

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
    @Put('user/update/basic-data/:id')
    async update(@Param('id') id: string, @Body() user: UserDTO) {
        console.log('este es el id', id);
        console.log('esta es la data', user);
        /*
       try {
        return await this.userServ.updateUserData(id, user);
       } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
       }
       */
    }

    @Post('user/upload/avatar')
    @UseInterceptors(FileInterceptor('avatar', setMulterImageOptions(5242880, './uploads/avatar', 'jpg|jpeg|png|gif')))
    async avatarUpload(@UploadedFile() file , @AuthUser() authUser: IUser, @Req() req ): Promise<any>  {
        try {
            const user = await this.userServ.findById(authUser._id);
            if (!user) {
                unlinkSync(file.path);
                throw new HttpException('no user was found, new file was deleted', HttpStatus.NOT_FOUND);
            } else {
                if (user.avatarUrl !== '') {
                    unlinkSync('./uploads/avatar/' + user.avatarUrl);
                }
                return await user.update({avatarUrl: file.filename});
            }
        } catch (error) {
            unlinkSync(file.path);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('user/avatar/:imagepath')
    seeUploadedFile(@Param('imagepath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads/avatar/' },
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
