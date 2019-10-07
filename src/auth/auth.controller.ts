import { Controller, HttpStatus, Post, Res, HttpException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/interfaces/user.interface';
import { AuthInterceptor } from './auth.interceptor';
import { servDecoded} from './server-decoded.decorator';
import { Sub } from 'src/interfaces/common.interface';

@Controller('auth')
export class AuthController {
    private user: User;

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
    @UseInterceptors(AuthInterceptor)
    public async authEncode(@Res() res, @servDecoded('sub') sub: Sub) {
        try {
            const respuesta = this.authServ.auth(sub);

            /*
            return res.status(HttpStatus.OK).json({
               payload,
               token,
            });
            */

        } catch ( error ) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
