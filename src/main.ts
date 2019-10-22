import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
      );

    app.enableCors();
    app.setGlobalPrefix('api');
    app.use('/public', express.static('public'));
    console.log(__dirname);
    await app.listen(process.env.POST || 3000);
    console.log('Servidor http corriendo en el puerto: ' + `${process.env.POST || 3000}`);
}
bootstrap();
