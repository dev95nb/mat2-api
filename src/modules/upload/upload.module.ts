import { ConfigAppModule } from '$modules/config/config.module';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [ConfigAppModule],
})
export class UploadModule {}
