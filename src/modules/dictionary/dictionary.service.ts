import { Injectable } from '@nestjs/common';
import { DictionaryRepository } from './dictionary.repository';
@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryRepo: DictionaryRepository) {}

  async getDefineWord(word: string, source: string) {
    const getWord = await this.dictionaryRepo.findOne({
      word,
      source,
    });

    if (!getWord) {
      const saveWord = await this.dictionaryRepo.createOne({
        word,
        source,
      });
      return {
        _id: saveWord.id,
        word,
        source,
      };
    }
    return getWord;
  }

  async searchWord(word: string, source: string) {
    return this.dictionaryRepo.searchWord(word, source);
  }
}
