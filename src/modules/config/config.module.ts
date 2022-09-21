import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigAppRepository } from './config.repository';
import { ConfigAppService } from './config.service';
import { ConfigApp, ConfigAppSchema } from './schemas/config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConfigApp.name, schema: ConfigAppSchema },
    ]),
  ],
  providers: [ConfigAppService, ConfigAppRepository],
  exports: [ConfigAppService],
})
export class ConfigAppModule {}
