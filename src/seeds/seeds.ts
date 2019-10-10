import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Seeds {
constructor(
) { }

@Command({ command: 'create:seeds', describe: 'creating seeds', autoExit: true })
async create() {
    /*
    const user = await this.userService.create({
        firstName: 'First name',
        lastName: 'Last name',
        mobile: 999999999,
        email: 'test@test.com',
        password: 'foo_b@r',
    });

    console.log(user);
    */
}
}