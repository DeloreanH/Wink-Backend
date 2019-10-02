import { Module } from '@nestjs/common';
import {JwtService} from '../common/services/jwt/jwt.service';
import {AuthController} from './auth.controller';

@Module({
    controllers: [AuthController],
    providers: [JwtService],
})
export class AuthModule {}
