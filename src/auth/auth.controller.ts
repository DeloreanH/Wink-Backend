import { Body, Controller, HttpStatus, Post, Res, UseFilters, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from '../interfaces/common.interface';
import { authServerDTO } from './dtos/auth-serve.dto';

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
            const response ='hola';
            const token   = await this.authServ.sign();
            return res.status(HttpStatus.OK).json({
               mongo: response,
            });

        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
