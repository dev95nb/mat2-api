import { ObjectId } from '$utils/mongoose';
import { Injectable } from '@nestjs/common';
import { SentenceRepository } from '../dictionary.repository';
import { ISentenceCore } from '../interfaces/dictionary.interfaces';
@Injectable()
export class SentenceService {
  constructor(private readonly sentenceRepo: SentenceRepository) {}

  async getSentence(dictionaryId: string, page: number, perPage: number) {
    return this.sentenceRepo.getSentence(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editSentence(
    userId: string,
    dictionaryId: string,
    sentenceId: string,
    data: ISentenceCore,
  ) {
    return this.sentenceRepo.editSentence(
      { dictionary: dictionaryId, sentenceId, creator: userId },
      data,
    );
  }

  async addSentence(userId: string, dictionaryId: string, data: ISentenceCore) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.sentenceRepo.addSentence(obj);
  }

  async deleteSentence(
    userId: string,
    dictionaryId: string,
    sentenceId: string,
  ) {
    return this.sentenceRepo.deleteSentence({
      _id: sentenceId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
