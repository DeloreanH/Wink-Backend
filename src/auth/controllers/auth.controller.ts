import { Controller, HttpStatus, Post, Res, HttpException, UseInterceptors, Req} from '@nestjs/common';
import { AuthInterceptor } from '@auth/interceptors';
import { servToken } from '@app/common/decorators';
import { IAuthResponse, IPayload } from '@app/common/interfaces';
import { AuthService } from '@auth/services';

@Controller('auth')
export class AuthController {

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
    async authEncode(@Res() res, @servToken('sToken') sToken: string, @servToken('sPayload') sPayload: IPayload) {
        try {
            const auth = await this.authServ.auth(sToken, sPayload) as IAuthResponse;
            return res.status(HttpStatus.OK).json({
               token: auth.token,
               exp: auth.exp,
               user: auth.user,
            });
        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    @Post('logout')
    async logout(@Req() req, @Res() res) {
        try {
            await this.authServ.logout(req.headers.authorization.split(' ')[1]);
            return res.status(HttpStatus.OK).json({
               status: 'logout successfully',
            });
        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
