import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async findUser(param: any): Promise<any> {
        return await this.userModel.findOne({param});
    }
}
