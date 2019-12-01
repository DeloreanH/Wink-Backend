import { Controller, Body, Post, HttpStatus, Res, Get } from '@nestjs/common';
import { AuthUser } from '@app/common/decorators';
import { IUser, IWink, IItem, ISocialLink } from '@app/common/interfaces';
import { itemsVisibility } from '@app/common/enums';
import { Tools } from '@app/common/tools';
import { UserService, ItemService } from '@app/core/services';
import {
    handleWinkDTO,
    showPrivateProfileDTO,
    winkIdDTO,
    winkUserIdDTO,
    findNearbyUsersDTO,
    updateUserVisibilitysDTO,
    updateUserStatusDTO,
 } from '@app/common/dtos';
import { WinkService } from './wink.service';
import { ObjectId } from 'bson';

@Controller('wink')
export class WinkController {
    constructor(
        private userServ: UserService,
        private winkService: WinkService,
        private itemServ: ItemService,
        ) {}

    @Post('nearby-users')
    nearbyUsers(@AuthUser() user: IUser, @Body() data: findNearbyUsersDTO): Promise<IUser[]>  {
        return this.userServ.findNearbyUsers(user._id, [data.longitude , data.latitude], data.sort);
    }
    @Post('show-public-profile')
    async showPublicProfile(@AuthUser() user: IUser, @Body() data: winkUserIdDTO, @Res() res): Promise<IWink>  {
        const searchParams = [
            {sender_id: user._id,  receiver_id: data.winkUserId},
            {sender_id: data.winkUserId ,  receiver_id: user._id},
        ];
        const wink      = await this.winkService.findByProperties(searchParams) as IWink;
        const otherUser = await this.userServ.findByIdOrFail(data.winkUserId) as IUser;
        const item      = await this.itemServ.getItems(otherUser._id, [itemsVisibility.BIO, itemsVisibility.PUBLIC]) as IItem[];
        if (!wink) {
            return res.status(HttpStatus.OK).json({
                wink: null,
                user: otherUser,
                userItems: item,
             });
        } else {
            return res.status(HttpStatus.OK).json({
                wink,
                user: otherUser,
                userItems: item,
             });
        }
    }
    @Post('send-wink')
    async sendWink(@AuthUser('_id') id: string, @Body() data: winkUserIdDTO, @Res() res): Promise<IWink>  {
        const searchParams = [
            {sender_id: id,  receiver_id: data.winkUserId},
            {sender_id: data.winkUserId ,  receiver_id: id},
        ];
        const response = await this.winkService.findByProperties(searchParams) as IWink;
        if (response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: 'already exist a wink between the users',
             });
        } else {
            const winkUser = await this.userServ.findByIdOrFail(data.winkUserId) as IUser;
            const user     = await this.userServ.findByIdOrFail(id) as IUser;
            const dataWink = {
                sender_id: user._id,
                senderVisibility: user.visibility,
                receiver_id: winkUser._id,
                receiverVisibility: winkUser.visibility,
                approved: false,
            };
            const wink = await this.winkService.createWink(dataWink);
            const distance = Tools.getDistance(
                user.location.coordinates[1],
                user.location.coordinates[0],
                winkUser.location.coordinates[1],
                winkUser.location.coordinates[0],
                'm',
                );
            return res.status(HttpStatus.OK).json({
                wink,
                distance,
             });
        }
    }
    @Post('get-user')
    async getWinkUser( @AuthUser('_id') id, @Res() res, @Body() data: winkUserIdDTO): Promise<IUser>  {
        try {
            const winkUser = await this.userServ.findByIdOrFail(data.winkUserId) as IUser;
            const user     = await this.userServ.findByIdOrFail(id) as IUser;
            const distance = Tools.getDistance(
                user.location.coordinates[1],
                user.location.coordinates[0],
                winkUser.location.coordinates[1],
                winkUser.location.coordinates[0],
                'm',
                );
            return res.status(HttpStatus.OK).json({
                winkUser,
                distance,
            });

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
              error,
             });
        }
    }
    @Get('get-winks')
    getUserWinks(@AuthUser() user: IUser): Promise<IWink[]>  {
        return this.winkService.getUserWinks(user._id);
    }
    @Post('handle-wink')
    async approveWink(@AuthUser() user: IUser, @Body() data: handleWinkDTO, @Res() res): Promise<IWink>  {
        const dataToUpdate = data.watch ? { watched: true } : { approved: true , watched: true };
        const resp = data.watch ? 'watched' : 'approved';
        const wink = await this.winkService.findByIdOrFail(data.wink_id);
        if ( user._id.toString() === wink.receiver_id.toString() ) {
            if (wink.approved || wink.watched) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    status: 'wink already ' + resp,
                    });
            } else {
                await wink.update(dataToUpdate);
                return res.status(HttpStatus.OK).json({
                    status: 'wink ' + resp,
                    });
            }
        } else {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: 'only receiver can approve winks or mark as watched',
                });
        }
    }
    @Post('show-private-profile')
    async showPrivateProfile(@Body() data: showPrivateProfileDTO, @Res() res): Promise<IItem[]>  {
        const wink = await this.winkService.findByIdOrFail(data.wink_id);
        if (!wink.approved) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: 'Wink is not approved',
            });
        } else {
            const visibility = new ObjectId(wink.sender_id).equals(data.winkUserId) ? wink.senderVisibility : wink.receiverVisibility;
            const toSearch = [];
            switch (visibility) {
                case 'personal':
                    toSearch.push(itemsVisibility.GENERAL, itemsVisibility.PERSONAL);
                    break;
                case 'professional':
                    toSearch.push(itemsVisibility.GENERAL, itemsVisibility.PROFESSIONAL);
                    break;
                case 'general':
                    toSearch.push(itemsVisibility.GENERAL);
                    break;
                default:
                    toSearch.push(itemsVisibility.GENERAL, itemsVisibility.PROFESSIONAL, itemsVisibility.PERSONAL);
                    break;
                }
            const items = await this.itemServ.getItems(data.winkUserId, toSearch);
            return res.status(HttpStatus.OK).json(items);
        }
    }
    @Post('delete-wink')
    async deleteWink(@Body() data: winkIdDTO, @Res() res): Promise<IWink>  {
        const wink = await this.winkService.findByIdOrFail(data.wink_id);
        await wink.remove();
        return res.status(HttpStatus.OK).json({
            status: 'wink deleted',
        });
    }
    @Post('user-status')
    async updateUserStatus(@AuthUser('_id') id: string, @Body() data: updateUserStatusDTO, @Res() res): Promise<IUser> {
        const user = await this.userServ.findByIdOrFail(id);
        await user.update({ status: data.status});
        return res.status(HttpStatus.OK).json({
            status: 'status updated successfully',
            user,
        });
    }
    @Get('social-network-links')
    async getSocialNetworkLinks(): Promise<ISocialLink[]>  {
        return await this.winkService.getSocialNetworksLinks();
    }

    // update visibility y user-status deberian ser una misma funcion, acomodar
    @Post('update-visibility')
    async updateUserVisibility(@AuthUser('_id') id: string, @Body() data: updateUserVisibilitysDTO, @Res() res): Promise<IUser> {
        const user = await this.userServ.findByIdOrFail(id);
        await user.update({ visibility: data.visibility});
        return res.status(HttpStatus.OK).json({
            status: 'visibility updated successfully',
            user,
        });
    }
}
