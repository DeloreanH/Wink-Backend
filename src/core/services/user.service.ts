import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from '../../common/dtos/users.dto';
import { IUser } from '../../common/interfaces/interfaces';
import { ObjectId } from 'bson';
import { modelName } from '../../database/models-name';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(modelName.USER) private userModel: Model<IUser>,
        ) {}

    public async findByProperties(param: UserDTO[]): Promise<IUser> {
        return await this.userModel.findOne({ $or: param });
    }

    public async findById(id: string): Promise<IUser> {
        return await this.userModel.findById(id);
    }
    public async findByIdOrFail(id: string): Promise<IUser> {
        const user = await this.userModel.findOne({_id: id});
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            return user;
        }
    }

    public async findByIdAndUpdate(id: string, data: UserDTO): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({_id: id}, data, {new: true} );
    }

    public async createUSer(user: UserDTO ): Promise<IUser> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    public async getUserWinks(id: string): Promise<any> {
        return await this.userModel.findOne({_id: id}).select('_id').populate('sendedWinks').populate('receivedWinks');
    }

    public async findNearbyUsers(userId: string , coordinates: [number, number], sort?: number ): Promise<IUser[]> {
        const sorting = sort ? sort : 1;
        await this.findByIdAndUpdate(userId, {location: { type: 'Point', coordinates}});
        return await this.userModel.aggregate([
            {
                $geoNear: {
                near: {
                    type: 'Point',
                    coordinates,
                },
                maxDistance: 3000,
                distanceField: 'distance',
                },
            },
            {
                $match: { _id: { $ne: new ObjectId(userId) } },
            },
            {
                $sort : { distance: sorting },
            },
        ]);
    }

    /*
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
