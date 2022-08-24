import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { ConfigAppService } from '../config/config.service';

@Injectable()
export class CronjobService {
  constructor(private readonly configAppService: ConfigAppService) {}
  private readonly logger = new Logger(CronjobService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  async updateTokenB2() {
    try {
      this.logger.log(`--- Update new token B2 start`);
      const res = await axios.get(
        'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
        {
          headers: {
            Authorization:
              'Basic MDA0MTkzMWQ2M2M3MzViMDAwMDAwMDAwMTpLMDA0cmNUZVhxYmdiRVRzemZ0K0RyaWloRHhBSTFj',
          },
        },
      );
      const { data } = res;
      await this.configAppService.updateB2Config(data.authorizationToken);
      this.logger.log(`--- Update new token B2 end`);
    } catch (errors) {
      console.log(errors);
    }
  }
}
