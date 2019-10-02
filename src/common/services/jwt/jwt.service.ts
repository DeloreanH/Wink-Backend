import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as authConfig from '../../../../auth.config.json';
import { jwtAlgorithm } from '../../../../enums/enums';
import {serverToken} from '../../../../commonInterfaces/interfaces';

@Injectable()
export class JwtService {
    private payload: {};
    private iat: number;
    private exp: number;
    constructor() {}

    public decode(token: string, secret?: string, algorithm?: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const decoded = await verify(
                    token,
                    secret || authConfig.authServerSecret,
                    { algorithms: [algorithm || jwtAlgorithm.HS256]},
                    ) as serverToken;
                if (!secret) {
                    this.payload = decoded.sub;
                    this.iat = decoded.iat;
                    this.exp = decoded.exp;
                }
                resolve(decoded);
            } catch (error) {
                reject(error);
            }
        });
    }

    public sign(): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const token = sign({data: this.payload, iat: this.iat, exp: this.exp }, authConfig.appSecret, { algorithm: jwtAlgorithm.HS256});
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    }

    public getServerPlayload(): any {
        return this.payload;
    }
    public getServerIat(): any {
        return this.payload;
    }
    public getServerExp(): any {
        return this.payload;
    }
}
