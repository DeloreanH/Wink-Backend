import { Body, Controller, Post, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth-user.decorator';

@Controller('user')
export class UserController {
    constructor(){}

    @Get('test')
    @UseGuards(new AuthGuard())
    hola(@AuthUser() user) {
        return user;
    }
}
