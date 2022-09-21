import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { Translate } from '../schemas/dictionary.schema';
import { ITranslateModel } from '../dictionary.model';
import { ITranslateCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class TranslateRepository extends BaseRepository<ITranslateModel> {
  constructor(@InjectModel(Translate.name) model) {
    super(model);
  }

  async editTranslate(filter: any, data: ITranslateCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addTranslate(data: any) {
    return this.model.create(data);
  }

  async deleteTranslate(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getTranslate(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
