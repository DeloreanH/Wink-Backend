import {Body, Controller, Post, Logger} from '@nestjs/common';
import {UsersService} from './users.service';
import {decode} from 'jwt-simple';

@Controller('users')
export class UsersController {
    private jwtSecret = '4l630dhkknbibc55gemb2gja';

    constructor( usersServ: UsersService ){
    }

    @Post('authenticate')
    authDecodeEncode(@Body() accessToken: any): any {
       return decode(accessToken.access_token, this.jwtSecret);
    }
}
