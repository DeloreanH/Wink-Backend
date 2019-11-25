import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
      );
    const logger = new Logger('app');
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(  new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
    }));
    app.use('/public', express.static('public'));
    await app.listen(process.env.PORT || 3000);
    logger.log('Http server running on port: ' + `${process.env.POST || 3000}`);
}
bootstrap();
