import { Injectable } from '@nestjs/common';
import { decode, encode, TAlgorithm } from 'jwt-simple';
import * as authConfig from '../../../../auth.config.json';
import { jwtAlgorithm } from '../../../../enums/enums';
import { ITokenOptions } from 'commonInterfaces/interfaces.js';
import * as moment from 'moment';

@Injectable()
export class JwtService {
    private token: string;
    private payload: any;
    private secret: string;
    private options: ITokenOptions;

    constructor(sub: any,  options: ITokenOptions, secret?: string) {
        this.secret = secret || authConfig.appSecret;
        this.options = options;

        // Crear el playload para el token
        this.payload = {
            sub,
            iat: moment().unix(), // Fecha creado
            exp: moment().add(this.options.expire.unit, this.options.expire.meaning).unix(), // fecha de expiracion
         };
    }

    public decode(token: string, noVerify = false, secret?: string, Algorithm?: TAlgorithm): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const decoded = await decode( token, secret || authConfig.appSecret, noVerify, Algorithm  || jwtAlgorithm.HS256);
                resolve(decoded);
            } catch (error) {
                reject(error);
            }
        });
    }

    public encode(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                this.token = encode(this.payload, authConfig.appSecret, jwtAlgorithm.HS256);
                resolve(this.token);
            } catch (error) {
                reject(error);
            }
        });
    }

    public getPlayload(): any {
        return this.payload;
    }
}
