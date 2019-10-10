import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { Seeds } from './seeds';

@Module({
    imports: [
        CommandModule,
    ],
    exports: [
        Seeds,
    ],
    providers: [
        Seeds,
    ],
})
export class SeedsModule {}
