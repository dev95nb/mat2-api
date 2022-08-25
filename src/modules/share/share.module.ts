import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareSchema } from './schemas/share.schema';
import { ShareController } from './share.controller';
import { ShareRepository } from './share.repository';
import { ShareService } from './share.service';

@Module({
  providers: [ShareService, ShareRepository],
  controllers: [ShareController],
  imports: [
    MongooseModule.forFeature([
      { name: ShareSchema.name, schema: ShareSchema.schema },
    ]),
  ],
  exports: [ShareService],
})
export class ShareModule {}
