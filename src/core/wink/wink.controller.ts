import { Controller, Body, Post, HttpStatus, Res, Get } from '@nestjs/common';
import { AuthUser } from '../../common/decorators/auth-decorators.decorator';
import { IUser, IWink, IItem, ISocialLink } from '../../common/interfaces/interfaces';
import { UserService } from '../../shared/services/user.service';
import { findNearbyUsersDTO } from './dtos/findNearbyUsers.dto';
import { updateUserStatusDTO } from './dtos/updateUserStatus.dto';
import { updateUserVisibilitysDTO } from './dtos/updateUserVisibility.dto';
import { WinkService } from './wink.service';
import { showPublicProfileDTO } from './dtos/showPublicProfileDTO';
import { ItemService } from '../../shared/services/item.service';
import { sendWinkDTO } from './dtos/sendWinkDTO';
import { winkIdDTO } from './dtos/winkIdDTO';

@Controller('wink')
export class WinkController {
    constructor(private userServ: UserService, private winkService: WinkService, private itemServ: ItemService) {}

    @Post('nearby-users')
    nearbyUsers(@AuthUser() user: IUser, @Body() data: findNearbyUsersDTO): Promise<IUser[]>  {
        return this.userServ.findNearbyUsers(user._id, [+data.longitude , +data.latitude], +data.sort);
    }
    @Post('show-public-profile')
    async showPublicProfile(@AuthUser() user: IUser, @Body() data: showPublicProfileDTO, @Res() res): Promise<IWink>  {
        const searchParams = [
            {sender_id: user._id,  receiver_id: data.winkUserId},
            {sender_id: data.winkUserId ,  receiver_id: user._id},
        ];
        const wink      = await this.winkService.findByProperties(searchParams) as IWink;
        const otherUser = await this.userServ.findByIdOrFail(data.winkUserId) as IUser;
        const item      = await this.itemServ.getPublicItems(otherUser._id) as IItem[];
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
    async sendWink(@AuthUser() user: IUser, @Body() data: sendWinkDTO, @Res() res): Promise<IWink>  {
        const searchParams = [
            {sender_id: user._id,  receiver_id: data.winkUserId},
            {sender_id: data.winkUserId ,  receiver_id: user._id},
        ];
        const response = await this.winkService.findByProperties(searchParams) as IWink;
        if (response) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: 'already exist a wink between the users',
             });
        } else {
            const winkUser = await this.userServ.findByIdOrFail(data.winkUserId) as IUser;
            const dataWink = {
                sender_id: user._id,
                senderVisibility: user.visibility,
                receiver_id: winkUser._id,
                receiverVisibility: winkUser.visibility,
                approved: false,
            };
            const wink = await this.winkService.createWink(dataWink);
            return res.status(HttpStatus.OK).json({
                wink,
             });
        }
    }
    @Post('approve-wink')
    async approveWink(@Body() data: winkIdDTO, @Res() res): Promise<IWink>  {

        const dataToUpdate = {
            approved: true,
        };
        await this.winkService.approveWink(data.wink_id, dataToUpdate);
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: 'wink approved',
         });
    }
    @Post('delete-wink')
    async deleteWink(@Body() data: winkIdDTO, @Res() res): Promise<IWink>  {
        await this.winkService.deleteWink(data.wink_id);
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: 'wink deleted',
         });
    }
    @Post('user/update/status')
    updateUserStatus(@AuthUser() user: IUser, @Body() data: updateUserStatusDTO): Promise<IUser> {
        return this.userServ.findByIdAndUpdate(user._id, { status: data.status});
    }
    @Get('social-network-links')
    getSocialNetworkLinks(): Promise<ISocialLink[]>  {
        return this.winkService.getSocialNetworksLinks();
    }
    @Post('user/update/visibility')
    updateUserVisibility(@AuthUser() user: IUser, @Body() data: updateUserVisibilitysDTO): Promise<IUser>  {
        return this.userServ.findByIdAndUpdate(user._id, { visibility: data.visibility});
    }
}
