import { Controller, Body, Post, HttpStatus, Res, Get } from '@nestjs/common';
import { AuthUser } from '../../common/decorators/auth-decorators.decorator';
import { IUser, IWink, IItem, ISocialLink } from '../../common/interfaces/interfaces';
import { UserService } from '../../shared/services/user.service';
import { findNearbyUsersDTO } from './dtos/findNearbyUsers.dto';
import { updateUserStatusDTO } from './dtos/updateUserStatus.dto';
import { updateUserVisibilitysDTO } from './dtos/updateUserVisibility.dto';
import { WinkService } from './wink.service';
import { ItemService } from '../../shared/services/item.service';
import { winkIdDTO } from './dtos/winkIdDTO';
import { winkUserIdDTO } from './dtos/winkUserId.dto';
import { showPrivateProfileDTO } from './dtos/showPrivateProfile.dto';
import { itemsVisibility } from '../../common/enums/enums';
import { ObjectId } from 'bson';
import { EventsGateway } from '../../events/events.gateway';
import { Tools } from 'src/common/tools/tools';

@Controller('wink')
export class WinkController {
    constructor(private userServ: UserService, private winkService: WinkService, private itemServ: ItemService, private events: EventsGateway) {}

    @Post('nearby-users')
    nearbyUsers(@AuthUser() user: IUser, @Body() data: findNearbyUsersDTO): Promise<IUser[]>  {
        return this.userServ.findNearbyUsers(user._id, [+data.longitude , +data.latitude], +data.sort);
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
            const clients = this.events.userClients.get(winkUser._id.toString());
            const distance = Tools.getDistance(
                user.location.coordinates[1],
                user.location.coordinates[0],
                winkUser.location.coordinates[1],
                winkUser.location.coordinates[0],
                'm',
                );
            if (clients) {
                clients.forEach( clientId => {
                    this.events.wss.to(clientId).emit('winked', {wink, winkUser, distance});
                });
            }
            return res.status(HttpStatus.OK).json({
                wink,
             });
        }
    }
    @Get('get-winks')
    getUserWinks(@AuthUser() user: IUser): Promise<IWink[]>  {
        return this.winkService.getUserWinks(user._id);
    }
    @Post('approve-wink')
    async approveWink(@Body() data: winkIdDTO, @Res() res): Promise<IWink>  {
        const dataToUpdate = {
            approved: true,
        };
        await this.winkService.approveWink(data.wink_id, dataToUpdate);
        return res.status(HttpStatus.OK).json({
            status: 'wink approved',
         });
    }
    @Post('user')
    async getWinkUser(@Body() data: winkUserIdDTO): Promise<IUser>  {
        return await this.userServ.findById(data.winkUserId);
    }

    @Post('points')
    points(@Body() data: { lat1: number, lon1: number, lat2: number, lon2: number }): any  {
        return Tools.getDistance(data.lat1, data.lon1, data.lat2, data.lon2, 'm');
    }

    @Post('show-private-profile')
   async showPrivateProfile(@Body() data: showPrivateProfileDTO, @Res() res): Promise<IItem[]>  {
        const wink = await this.winkService.findByIdOrFail(data.wink_id);
        if (!wink) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: 'Wink not found',
             });
        } else {
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
    }
    @Post('delete-wink')
    async deleteWink(@Body() data: winkIdDTO, @Res() res): Promise<IWink>  {
        await this.winkService.deleteWink(data.wink_id);
        return res.status(HttpStatus.OK).json({
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
