import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.listen(process.env.POST || 3000);
    console.log('Servidor http corriendo en el puerto: ' + `${process.env.POST || 3000}`);
}
bootstrap();
