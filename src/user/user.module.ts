import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
  ],
  exports: [
    UserService,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
