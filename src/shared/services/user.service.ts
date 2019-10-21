import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../dtos/users.dto';
import { IUser } from '../interfaces/interfaces';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<IUser>,
        ) {}

    public async findByProperties(param: UserDTO[]): Promise<IUser> {
        return await this.userModel.findOne({ $or: param });
    }

    public async findById(id: string): Promise<IUser> {
        return await this.userModel.findOne({_id: id});
    }

    public async findByIdAndUpdate(id: string, data: UserDTO): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({_id: id}, data );
    }

    public async createUSer(user: UserDTO ): Promise<IUser> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }/*
    public async updateAvatar(id: string , user: UserDTO ): Promise<IUser> {
        return new Promise( async (resolve, reject) => {
            const session = await this.userModel.db.startSession();
            try {
                const updated = await this.userModel.findByIdAndUpdate(id, user);
                this.http.post('web', 'hola', { headers: {
                    'Content-Type': 'application/json',
                  }}).toPromise();

                await session.commitTransaction();

            } catch (error) {
                await session.abortTransaction();
                reject(error);
            } finally {
                session.endSession();
            }
        });
    }*/
}
