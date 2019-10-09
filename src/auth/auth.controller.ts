import { Controller, HttpStatus, Post, Res, HttpException, UseInterceptors, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interface';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Payload, authResponse } from 'src/common/interfaces/common.interface';
import { servDecoded } from './decorators/auth-decorators.decorator';

@Controller('auth')
export class AuthController {
    private user: User;

    constructor( private authServ: AuthService) {}

    /**
     * @description se intercepta el token proveniente del servidor y se mapea en un decorator, este metodo
     * se encarga de llamar al servicio que encripta un nuevo token de auth al usuario
     * @author Harry Perez
     * @date 2019-10-02
     * @param {Request} res request de la peticion
     * @param {Response} data response de la peticion
     * @memberof AuthController
     */
    @Post('authenticate')
    @UseInterceptors(AuthInterceptor)
    public async authEncode(@Res() res, @servDecoded() sPayload: Payload) {
        try {
            const auth = await this.authServ.auth(sPayload) as authResponse;
            return res.status(HttpStatus.OK).json({
               token: auth.token,
               exp: auth.exp,
               emptyProfile: auth.emptyProfile,
            });
        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('test')
    hola(){
        return 'si funciona';
    }
}
