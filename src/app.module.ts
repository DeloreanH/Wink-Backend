import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_HOST),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
  ],
})
export class AppModule {}
