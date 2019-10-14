import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { jwtAlgorithm } from '../shared/enums/enums';
import { UserService } from '../shared/services/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDTO } from '../shared/dtos/log.dto';
import { UserDTO } from '../shared/dtos/users.dto';
import { Sub, Payload, Log, authResponse } from 'src/shared/interfaces/interfaces';

@Injectable()
export class AuthService {
    private sub: Sub;
    private iat: number;
    private exp: number;
    private payload: Payload;

    constructor(
         private userServ: UserService,
         @InjectModel('Log') private LogModel: Model<Log>,
         ) {}

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
     * @description setea el payload para posteriormente firmarlo con el metodo sign()
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

    /**
     * @description busca al usuario para posteriormente generar un token, de no existir el usuario
     * este se creara y luego generara el token
     * @author Harry Perez
     * @date 2019-10-08
     * @param spayload payload del token proveniente del servidor
     * @returns Promise<authResponse>
     * @memberof AuthService
     */
    public async auth(sPayload: Payload): Promise<authResponse> {
        return new Promise( async (resolve, reject) => {
            // parametros para buscar al usuario
            const toFind: UserDTO[] = [];
            if (sPayload.sub.email) {
                toFind.push({email: sPayload.sub.email});
            }
            if (sPayload.sub.username) {
                toFind.push({email: sPayload.sub.username});
            }
            if (sPayload.sub.phone) {
                toFind.push({
                    phone: {
                        phoneCode: sPayload.sub.phone.phoneCode,
                        phoneNumber: sPayload.sub.phone.phoneNumber,
                    },
                });
            }
            // all no pasar estos tres para metros no se puede ubicar al usuario
            if (!sPayload.sub.email && !sPayload.sub.phone && !sPayload.sub.username) {
                reject('no email, phone or username was provide');
            }
            // busqueda del usuario a la base de datos
            const user = await this.userServ.findByProperties(toFind);
            try {
                let token;
                // de no existir el usuario, se crea
                if (!user) {
                    const newUser = await this.userServ.createUSer(sPayload.sub);
                    this.setPayload({sub: newUser, iat: sPayload.iat, exp: sPayload.exp});
                    token = await this.sign();
                 } else {
                    this.setPayload({sub: user, iat: sPayload.iat, exp: sPayload.exp});
                    token = await this.sign();
                 }
                 // log de sesion
                await this.logger({userId: this.sub._id, provider: sPayload.sub.provider, token});
                 // luego de setear el payload y haber realizado el sign(), se resuelve la promesa
                resolve({exp: this.exp, token, emptyProfile: this.sub.emptyProfile});
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @description crea un nuevo log cada vez que el usuario se logea en el sistema
     * @author Harry Perez
     * @date 2019-10-08
     * @param log
     * @returns Promise<Log>
     * @memberof AuthService
     */
    private async logger(log: LogDTO): Promise<Log> {
        const createdLog = new this.LogModel(log);
        return await createdLog.save();
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
