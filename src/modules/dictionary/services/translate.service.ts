import { translateText } from '$utils/common';
import { ObjectId } from '$utils/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DictionaryRepository,
  TranslateRepository,
} from '../dictionary.repository';
import { ITranslateCore } from '../interfaces/dictionary.interfaces';
@Injectable()
export class TranslateService {
  constructor(
    private readonly dictionaryRepo: DictionaryRepository,
    private readonly translateRepo: TranslateRepository,
  ) {}

  async getTranslate(
    dictionaryId: string,
    destination: string,
    page: number,
    perPage: number,
  ) {
    const getTranslate = await this.translateRepo.find({
      dictionary: dictionaryId,
    });

    if (getTranslate.length === 0) {
      const getWord = await this.dictionaryRepo.findOneById(dictionaryId);
      if (!getWord) {
        throw new HttpException('WORD_NOT_FOUND', HttpStatus.BAD_REQUEST);
      }
      const textTran = await translateText(getWord.word, destination);
      const saveTran = await this.translateRepo.createOne({
        dictionary: getWord._id,
        translateValue: textTran[0],
        isVerify: true,
        isAI: true,
        toLanguage: destination,
      });
      return {
        items: [saveTran],
        totalCount: 1,
        pageCount: 1,
      };
    }
    return this.translateRepo.getTranslate(
      {
        dictionary: ObjectId(dictionaryId),
        toLanguage: destination,
      },
      page,
      perPage,
    );
  }

  async editTranslate(
    userId: string,
    dictionaryId: string,
    translateId: string,
    data: ITranslateCore,
  ) {
    return this.translateRepo.editTranslate(
      { dictionary: dictionaryId, translateId, creator: userId },
      data,
    );
  }

  async addTranslate(
    userId: string,
    dictionaryId: string,
    data: ITranslateCore,
  ) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.translateRepo.addTranslate(obj);
  }

  async deleteTranslate(
    userId: string,
    dictionaryId: string,
    translateId: string,
  ) {
    return this.translateRepo.deleteTranslate({
      _id: translateId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
