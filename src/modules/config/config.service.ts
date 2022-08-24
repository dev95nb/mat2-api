import { Injectable } from '@nestjs/common';
import { ConfigAppRepository } from './config.repository';
@Injectable()
export class ConfigAppService {
  constructor(private readonly repo: ConfigAppRepository) {}

  async updateB2Config(token: string) {
    return this.repo.updateTokenB2(token);
  }

  async getB2Config() {
    return this.repo.getB2Config();
  }
}
