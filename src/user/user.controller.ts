import { Body, Controller, Post, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/decorators/auth-decorators.decorator';

@Controller('user')
export class UserController {
    constructor(){}

    @Get('test')
    hola(@AuthUser() user) {
        return 'hola haryr';
    }
    @Get('test/test2')
    hola2(@AuthUser() user) {
        return user;
    }
}
