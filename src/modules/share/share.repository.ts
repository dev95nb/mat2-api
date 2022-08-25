import { IShareModel } from './share.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { ShareSchema } from './schemas/share.schema';
@Injectable()
export class ShareRepository extends BaseRepository<IShareModel> {
  constructor(@InjectModel(ShareSchema.name) model) {
    super(model);
  }

  async getDetailMe(userId: string) {
    return this.model
      .findById(userId)
      .select([
        'name',
        'email',
        'status',
        'isDark',
        'language',
        'notificationSetting',
      ])
      .lean();
  }
}
