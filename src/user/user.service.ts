import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dtos/users.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}

    public async findUser(param: any): Promise<User> {
        return await this.userModel.findOne({ $or: param });
    }
    public async createUSer(user: UserDTO ): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
}
