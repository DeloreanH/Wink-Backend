import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../shared/schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
      ],
      exports: [
        UserService,
      ],
      controllers: [
      ],
      providers: [
        UserService,
      ],
})
export class SharedModule {}
