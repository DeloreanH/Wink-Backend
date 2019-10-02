import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {JwtService} from '../common/services/jwt/jwt.service';
import {authServerDTO} from './dto/auth-serve.dto';

@Controller('auth')
export class AuthController {

    constructor( private jwtServ: JwtService){}

    @Post('authenticate')
    authDecodeEncode(@Res() res , @Body() data: authServerDTO): any {
        this.jwtServ.decode(data.access_token).then( decoded => {
            this.jwtServ.sign().then(token => {
                return res.status(HttpStatus.OK).json({
                    jwt: token,
                });
            });
        }).catch(error => {
            const message = 'Token error: ' + error.message;
            return res.status(HttpStatus.FORBIDDEN).json({
                message,
            });
        });
    }
}
