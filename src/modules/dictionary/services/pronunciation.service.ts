import { ObjectId } from '$utils/mongoose';
import { Injectable } from '@nestjs/common';
import { IPronunciationCore } from '../interfaces/dictionary.interfaces';
import { PronunciationRepository } from '../repository';
@Injectable()
export class PronunciationService {
  constructor(private readonly pronunciationRepo: PronunciationRepository) {}

  // pronunciation
  async getPronunciation(
    dictionaryId: string,
    source: string,
    page: number,
    perPage: number,
  ) {
    return this.pronunciationRepo.getPronunciation(
      {
        dictionary: ObjectId(dictionaryId),
        source,
      },
      page,
      perPage,
    );
  }

  async editPronunciation(
    userId: string,
    dictionaryId: string,
    pronunciationId: string,
    data: IPronunciationCore,
  ) {
    return this.pronunciationRepo.editPronunciation(
      { dictionary: dictionaryId, pronunciationId, creator: userId },
      data,
    );
  }

  async addPronunciation(
    userId: string,
    dictionaryId: string,
    data: IPronunciationCore,
  ) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.pronunciationRepo.addPronunciation(obj);
  }

  async deletePronunciation(
    userId: string,
    dictionaryId: string,
    pronunciationId: string,
  ) {
    return this.pronunciationRepo.deletePronunciation({
      _id: pronunciationId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
