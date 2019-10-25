import { Controller, Get, Req, Body, Post } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth-decorators.decorator';
import { IUser } from 'src/common/interfaces/interfaces';
import { UserService } from 'src/shared/services/user.service';
import { findNearbyUsersDTO } from './dtos/findNearbyUsers.dto';
import { updateUserStatusDTO } from './dtos/updateUserStatus.dto';
import { updateUserVisibilitysDTO } from './dtos/updateUserStatus.dto copy';

@Controller('wink')
export class WinkController {
    constructor(private userServ: UserService) {}

    @Post('nearby-users')
    nearbyUsers(@AuthUser() user: IUser, @Body() data: findNearbyUsersDTO): Promise<IUser[]>  {
        return this.userServ.findNearbyUsers(user._id, [+data.longitude , +data.latitude], +data.sort);
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
