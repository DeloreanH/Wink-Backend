import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { jwtAlgorithm } from '../../common/enums/enums';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sesionDTO } from '../dtos/sesion.dto';
import { UserDTO } from '../dtos/users.dto';
import { ISub, IPayload, ISesion, IAuthResponse, IItem } from '../../common/interfaces/interfaces';
import * as moment from 'moment';
import { modelName } from '../../database/models-name';
import { itemsDefault } from '../../auth/itemsDefault';

@Injectable()
export class AuthService {
    private sub: ISub;
    private iat: number;
    private exp: number;
    private payload: IPayload;

    constructor(
         private userServ: UserService,
         @InjectModel(modelName.SESION) private sesionModel: Model<ISesion>,
         @InjectModel(modelName.ITEM) private itemModel: Model<IItem>,
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
    public decode(token: string, fromServer = false, algorithm?: string): Promise<IPayload> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const decoded = await verify(
                    token,
                    fromServer ? process.env.SERVER_SECRET : process.env.SECRET,
                    { algorithms: [algorithm || jwtAlgorithm.HS256]},
                    ) as IPayload;
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
    public setPayload(payload: IPayload): Promise<IPayload> {
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
    public async auth( sToken: string, sPayload: IPayload): Promise<IAuthResponse> {
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
                    this.setBasicItemsToUser(newUser._id);
                 } else {
                    this.setPayload({sub: user, iat: sPayload.iat, exp: sPayload.exp});
                    token = await this.sign();
                 }
                await this.sesionLogger({user_id: this.sub._id, token, serverToken: sToken, expireAt: moment.unix(sPayload.exp) });
                 // luego de setear el payload y haber realizado el sign(), se resuelve la promesa
                resolve({exp: this.exp, token, user: this.sub, emptyProfile: this.sub.emptyProfile});
            } catch (error) {
                reject(error);
            }
        });
    }

    public async checkBlackList( token: string ): Promise<string> {
        return new Promise( async (resolve, reject) => {
            const sesionLog = await this.sesionModel.findOne({ token }) as ISesion;
            if (sesionLog) {
                if (sesionLog.blacklist) {
                    reject('token is blacklisted');
                } else {
                    resolve('token is okey');
                }
            } else {
                reject('token not found');
            }
        });
    }
    public async logout( token: string ): Promise<ISesion> {
        return new Promise( async (resolve, reject) => {
            const blacklisted = await this.sesionModel.findOneAndUpdate({ token }, { blacklist: true });
            if (!blacklisted) {
               reject('token not found');
            }
            resolve(blacklisted);
        });
    }
    public async setBasicItemsToUser( userId: string ): Promise<any[]> {
        const basicItems = itemsDefault.map( item => {
            return Object.assign(item, {user_id: userId});
        });
        return await  this.itemModel.insertMany(basicItems);
    }

    /**
     * @description crea un nuevo log cada vez que el usuario se logea en el sistema
     * @author Harry Perez
     * @date 2019-10-08
     * @param log
     * @returns Promise<Log>
     * @memberof AuthService
     */
    private async sesionLogger(sesion: sesionDTO): Promise<ISesion> {
        const createdLog = new this.sesionModel(sesion);
        return await createdLog.save();
    }

    /**
     * @description geter del sub, retornara nulo si no se setea el payload primero setPayload()
     * @author Harry Perez
     * @date 2019-10-02
     * @returns number
     * @memberof AuthService
     */
    public getSub(): ISub {
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
