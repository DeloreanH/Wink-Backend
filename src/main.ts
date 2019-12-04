import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe, Logger } from '@nestjs/common';

declare const module: any;
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
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
    logger.log('Http server running on port: ' + `${ process.env.POST || 3000}`);
}
bootstrap();
