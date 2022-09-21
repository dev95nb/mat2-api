import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { Sentence } from '../schemas/dictionary.schema';
import { ISentenceModel } from '../dictionary.model';
import { ISentenceCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class SentenceRepository extends BaseRepository<ISentenceModel> {
  constructor(@InjectModel(Sentence.name) model) {
    super(model);
  }

  async editSentence(filter: any, data: ISentenceCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addSentence(data: any) {
    return this.model.create(data);
  }

  async deleteSentence(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getSentence(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
