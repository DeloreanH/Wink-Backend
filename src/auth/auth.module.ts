import { Module } from '@nestjs/common';
import {AuthController} from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from './schemas/log.schema';
@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Log', schema: logSchema }]),
      UserModule,
      ],
    exports: [
      AuthService,
    ],
    controllers: [
      AuthController,
    ],
    providers: [
      AuthService,
    ],
})
export class AuthModule {}
