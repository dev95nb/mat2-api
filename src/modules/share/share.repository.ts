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

  async getListShare(
    userId: string,
    lang: string,
    page: number,
    perPage: number,
  ) {
    const query = this.model.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
