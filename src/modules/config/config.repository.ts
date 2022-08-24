import { IConfigModel } from './config.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { ConfigAppSchema } from './schemas/config.schema';

@Injectable()
export class ConfigAppRepository extends BaseRepository<IConfigModel> {
  constructor(@InjectModel(ConfigAppSchema.name) model) {
    super(model);
  }

  async updateTokenB2(token: string) {
    return this.model.findOneAndUpdate(
      {},
      {
        b2: {
          token,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      },
    );
  }

  async getB2Config() {
    const data = await this.model.findOne().select(['b2.token']);
    if (!data) return null;
    return data.b2.token;
  }
}
