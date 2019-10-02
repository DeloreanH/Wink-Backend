import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {authServerDTO} from './dto/auth-serve.dto';
import { AuthService } from './auth.service';
import { Payload } from '../../commonInterfaces/interfaces';

@Controller('auth')
export class AuthController {

    constructor( private authServ: AuthService) {}

    /**
     * @description Decodica el token del AuthServer y encodifica uno nuevo para uso interno de la app
     * @author Harry Perez
     * @date 2019-10-02
     * @param {Request} res request de la peticion
     * @param {Response} data response de la peticion
     * @memberof AuthController
     */
    @Post('authenticate')
    public async authDecodeEncode(@Res() res , @Body() data: authServerDTO) {
        try {
            await this.authServ.decode(data.access_token, true);
            const payload = await this.authServ.setPayload() as Payload;
            const token   = await this.authServ.sign();
            return res.status(HttpStatus.OK).json({
                token,
                exp: payload.exp,
            });

        } catch ( error ) {
            return res.status(HttpStatus.FORBIDDEN).json({
                error,
            });
        }
    }
}
