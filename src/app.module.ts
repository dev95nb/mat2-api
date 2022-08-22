import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '$modules/auth/auth.module';
import { UserModule } from '$modules/user/user.module';
import { DictionaryModule } from '$modules/dictionary/dictionary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
    DictionaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
