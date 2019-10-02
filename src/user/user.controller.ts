import { Body, Controller, Post, Get, Res, HttpStatus } from '@nestjs/common';
import { JwtService } from '../common/services/jwt/jwt.service';

@Controller('user')
export class UserController {
    constructor(){}
}
