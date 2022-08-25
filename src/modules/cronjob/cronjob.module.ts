import { Module } from '@nestjs/common';
import { ConfigAppModule } from '../config/config.module';
import { CronjobService } from './cronjob.service';

@Module({
  providers: [CronjobService],
  imports: [ConfigAppModule],
})
export class CronjobModule {}
