import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Share, ShareSchema } from './schemas/share.schema';
import { ShareController } from './share.controller';
import { ShareRepository } from './share.repository';
import { ShareService } from './share.service';

@Module({
  providers: [ShareService, ShareRepository],
  controllers: [ShareController],
  imports: [
    MongooseModule.forFeature([{ name: Share.name, schema: ShareSchema }]),
  ],
  exports: [ShareService],
})
export class ShareModule {}
