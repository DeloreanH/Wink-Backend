import { Body, Controller, Post, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/auth-decorators.decorator';

@Controller('user')
export class UserController {
    constructor(){}

    @Get('test')
    hola(@AuthUser() user) {
        return user;
    }
}
