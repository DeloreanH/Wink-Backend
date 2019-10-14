import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../dtos/users.dto';
import { User } from '../interfaces/interfaces';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    public async findByProperties(param: UserDTO[]): Promise<User> {
        return await this.userModel.findOne({ $or: param });
    }

    public async findById(id: string): Promise<User> {
        return await this.userModel.findOne({_id: id});
    }

    public async createUSer(user: UserDTO ): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
}
