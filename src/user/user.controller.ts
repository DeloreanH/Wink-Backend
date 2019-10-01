import { Body, Controller, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '../common/services/jwt/jwt.service';

@Controller('user')
export class UserController {

    constructor( private jwtServ: JwtService){}

    @Post('authenticate')
    authDecodeEncode(@Res() res , @Body() data: authServerDTO): any {
        this.jwtServ.decode(data.obj.accessToken).then( decoded => {
            return res.status(HttpStatus.OK).json({
                user: decoded,
            });
        });
    }

}
