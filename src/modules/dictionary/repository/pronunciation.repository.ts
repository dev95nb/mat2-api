import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { Pronunciation } from '../schemas/dictionary.schema';
import { IPronunciationModel } from '../dictionary.model';
import { IPronunciationCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class PronunciationRepository extends BaseRepository<IPronunciationModel> {
  constructor(@InjectModel(Pronunciation.name) model) {
    super(model);
  }

  async getPronunciation(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }

  async editPronunciation(filter: any, data: IPronunciationCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addPronunciation(data: any) {
    return this.model.create(data);
  }

  async deletePronunciation(filter: any) {
    return this.model.deleteOne(filter);
  }
}
