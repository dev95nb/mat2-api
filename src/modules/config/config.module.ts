import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppRepository } from './config.repository';
import { ConfigAppService } from './config.service';
import { ConfigAppSchema } from './schemas/config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConfigAppSchema.name, schema: ConfigAppSchema.schema },
    ]),
  ],
  providers: [ConfigAppService, ConfigAppRepository],
  exports: [ConfigAppService],
})
export class ConfigAppModule {}
