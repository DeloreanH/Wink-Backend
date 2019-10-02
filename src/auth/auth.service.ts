import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as authConfig from '../../auth.config.json';
import { jwtAlgorithm } from '../../enums/enums';
import { Payload, Sub } from '../../commonInterfaces/interfaces';

@Injectable()
export class AuthService {
    private serverSub: Sub;
    private serverIat: number;
    private serverExp: number;
    private sub: Sub;
    private iat: number;
    private exp: number;
    private payload: Payload;

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
                    fromServer ? authConfig.authServerSecret : authConfig.appSecret,
                    { algorithms: [algorithm || jwtAlgorithm.HS256]},
                    ) as Payload;
                if (fromServer) {
                    this.serverSub = decoded.sub;
                    this.serverIat = decoded.iat;
                    this.serverExp = decoded.exp;
                }
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
                const token = sign( this.payload, authConfig.appSecret, { algorithm: jwtAlgorithm.HS256});
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
    public setPayload(payload?: Payload): Promise<Payload> {
        return new Promise<any>((resolve, reject) => {
            if (!payload) {
                if ( !this.serverExp && !this.serverIat && !this.serverSub ) {
                    reject('no payload from server, decoded token first and set fromServer true');
                } else {
                    this.payload = {
                        sub: this.serverSub,
                        iat: this.serverIat,
                        exp: this.serverExp,
                    };
                    resolve(this.payload);
                }
            } else {
                this.sub = payload.sub;
                this.iat = payload.iat;
                this.exp = payload.exp;
                this.payload = {
                    sub: payload.sub,
                    iat: payload.iat,
                    exp: payload.exp,
                };
                resolve(this.payload);
            }
        });
    }

    /**
     * @description geter del sub del server, retornara nulo si no se decodifica con el parametro fromServer=true
     * @author Harry Perez
     * @date 2019-10-02
     * @param payload payload a setear
     * @returns Sub
     * @memberof AuthService
     */
    public getServerSub(): Sub {
        return this.serverSub;
    }

    /**
     * @description geter del iat del server, retornara nulo si no se decodifica con el parametro fromServer=true
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getServerIat(): number {
        return this.serverIat;
    }

    /**
     * @description geter del exp del server, retornara nulo si no se decodifica con el parametro fromServer=true
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getServerExp(): number {
        return this.serverExp;
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
