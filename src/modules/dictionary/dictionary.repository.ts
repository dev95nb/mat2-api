import { IDictionaryModel } from './dictionary.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { DescriptionSchema } from './schemas/dictionary.schema';
@Injectable()
export class DictionaryRepository extends BaseRepository<IDictionaryModel> {
  constructor(@InjectModel(DescriptionSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }

  async getUserByOpenId(openId: string) {
    return this.model.findOne({ openId }).lean();
  }
}
