import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { jwtAlgorithm } from '../enums/enums';
import { Payload, Sub } from '../interfaces/common.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    private sub: Sub;
    private iat: number;
    private exp: number;
    private payload: Payload;

    constructor( private userServ: UserService) {}

    /**
     * @description Decodica un token jwt
     * @author Harry Perez
     * @date 2019-10-02
     * @param token token a decodificar
     * @param fromServer indica si se desea decodificar un token proveniente del AuthServer
     * @param algorithm especifica el algoritmo utilizado para la decoficacion, por defecto H256
     * @returns Promise<Payload>
     * @memberof AuthService
     */
    public decode(token: string, fromServer = false, algorithm?: string): Promise<Payload> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const decoded = await verify(
                    token,
                    fromServer ? process.env.SERVER_SECRET : process.env.SECRET,
                    { algorithms: [algorithm || jwtAlgorithm.HS256]},
                    ) as Payload;
                resolve(decoded);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description firma un payload con un secret, generando un token jwt
     * @author Harry Perez
     * @date 2019-10-02
     * @returns Promise<string>
     * @memberof AuthService
     */
    public sign(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const token = sign( this.payload, process.env.SECRET, { algorithm: jwtAlgorithm.HS256});
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description setea el payload para posteriormente firmarlo
     * @author Harry Perez
     * @date 2019-10-02
     * @param payload payload a setear
     * @returns Promise<Payload>
     * @memberof AuthService
     */
    public setPayload(payload: Payload): Promise<Payload> {
        return new Promise((resolve, reject) => {
            this.sub = payload.sub;
            this.iat = payload.iat;
            this.exp = payload.exp;
            this.payload = {
                sub: payload.sub,
                iat: payload.iat,
                exp: payload.exp,
            };
            resolve(this.payload);
        });
    }

    public async auth(serverSub: Sub) {
        const toFind = [];
        if (serverSub.email) {
            toFind.push({email: serverSub.email});
        }
        if (serverSub.phone) {
            toFind.push({
                phone: {
                    phoneCode: serverSub.phone.phoneCode,
                    phoneNumber: serverSub.phone.phoneNumber,
                },
            });
        }
        if (!serverSub.email && !serverSub.phone) {
            throw new HttpException('no email or phone was provide', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userServ.findUser(toFind);
        console.log('usuario encontrado', user);
        if (!user) {
            //crear y encodear
        } else {
            // encodear
        }
        // retornar
    }

    /**
     * @description geter del sub, retornara nulo si no se setea el payload primero setPayload()
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getSub(): Sub {
        return this.sub;
    }

    /**
     * @description geter del iat, retornara nulo si no se setea el payload primero setPayload()
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getIat(): number {
        return this.iat;
    }

    /**
     * @description geter del exp, retornara nulo si no se setea el payload primero setPayload()
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getExp(): number {
        return this.exp;
    }
}
