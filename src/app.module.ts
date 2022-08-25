import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '$modules/auth/auth.module';
import { UserModule } from '$modules/user/user.module';
import { DictionaryModule } from '$modules/dictionary/dictionary.module';
import { UploadModule } from '$modules/upload/upload.module';
import { CronjobModule } from '$modules/cronjob/cronjob.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ShareModule } from '$modules/share/share.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
    DictionaryModule,
    UploadModule,
    CronjobModule,
    ShareModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
