import { Controller, Get, Req, Body, Post, HttpStatus, Res } from '@nestjs/common';
import { AuthUser } from '../../common/decorators/auth-decorators.decorator';
import { IUser, IWink, IItem } from '../../common/interfaces/interfaces';
import { UserService } from '../../shared/services/user.service';
import { findNearbyUsersDTO } from './dtos/findNearbyUsers.dto';
import { updateUserStatusDTO } from './dtos/updateUserStatus.dto';
import { updateUserVisibilitysDTO } from './dtos/updateUserVisibility.dto';
import { WinkService } from './wink.service';
import { showPublicProfileDTO } from './dtos/showPublicProfileDTO';
import { ItemService } from '../../shared/services/item.service';

@Controller('wink')
export class WinkController {
    constructor(private userServ: UserService, private winkService: WinkService, private itemServ: ItemService) {}

    @Post('nearby-users')
    nearbyUsers(@AuthUser() user: IUser, @Body() data: findNearbyUsersDTO): Promise<IUser[]>  {
        return this.userServ.findNearbyUsers(user._id, [+data.longitude , +data.latitude], +data.sort);
    }
    @Post('show-public-profile')
    async show(@AuthUser() user: IUser, @Body() data: showPublicProfileDTO, @Res() res): Promise<IWink>  {
        const searchParams = [
            {sender_id: user._id,  receiver_id: data.userToCheckId},
            {sender_id: data.userToCheckId ,  receiver_id: user._id},
        ];
        const wink      = await this.winkService.findByProperties(searchParams) as IWink;
        const otherUser = await this.userServ.findByIdOrFail(data.userToCheckId) as IUser;
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
    @Post('user/update/status')
    updateUserStatus(@AuthUser() user: IUser, @Body() data: updateUserStatusDTO): Promise<IUser>  {
        return this.userServ.findByIdAndUpdate(user._id, { status: data.status});
    }
    @Post('user/update/visibility')
    updateUserVisibility(@AuthUser() user: IUser, @Body() data: updateUserVisibilitysDTO): Promise<IUser>  {
        return this.userServ.findByIdAndUpdate(user._id, { visibility: data.visibility});
    }
}
