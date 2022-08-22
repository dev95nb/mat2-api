import { Injectable } from '@nestjs/common';
import {
  ClassRepository,
  DescriptionRepository,
  DictionaryRepository,
  NoteRepository,
  PronunciationRepository,
  SentenceRepository,
  TranslateRepository,
  VideoRepository,
} from './dictionary.repository';
import {
  IClassCore,
  INoteCore,
  IPronunciationCore,
  ISentenceCore,
  ITranslateCore,
} from './interfaces/dictionary.interfaces';
@Injectable()
export class DictionaryService {
  constructor(
    private readonly dictionaryRepo: DictionaryRepository,
    private readonly pronunciationRepo: PronunciationRepository,
    private readonly translateRepo: TranslateRepository,
    private readonly descriptionRepo: DescriptionRepository,
    private readonly classRepo: ClassRepository,
    private readonly videoRepo: VideoRepository,
    private readonly sentenceRepo: SentenceRepository,
    private readonly noteRepo: NoteRepository,
  ) {}

  async getDefineWord(word: string) {
    return this.dictionaryRepo.findOne({ word });
  }

  async searchWord(word: string) {
    return this.dictionaryRepo.searchWord(word);
  }

  // translate
  async getTranslate(dictionaryId: string) {
    return this.translateRepo.find({ dictionary: dictionaryId });
  }

  async editTranslate(dictionaryId: string, data: ITranslateCore) {}

  async addTranslate(dictionaryId: string, data: ITranslateCore) {}

  async deleteTranslate(dictionaryId: string, translateId: string) {}

  // pronunciation
  async getPronunciation(dictionaryId: string) {
    return this.pronunciationRepo.find({ dictionary: dictionaryId });
  }

  async editPronunciation(dictionaryId: string, data: IPronunciationCore) {}

  async addPronunciation(dictionaryId: string, data: IPronunciationCore) {}

  async deletePronunciation(dictionaryId: string, pronunciationId: string) {}

  // class
  async getClass(dictionaryId: string) {
    return this.classRepo.find({ dictionary: dictionaryId });
  }

  async editClass(dictionaryId: string, data: IClassCore) {}

  async addClass(dictionaryId: string, data: IClassCore) {}

  async deleteClass(dictionaryId: string, classId: string) {}

  // Sentence
  async getSentence(dictionaryId: string) {
    return this.sentenceRepo.find({ dictionary: dictionaryId });
  }

  async editSentence(dictionaryId: string, data: ISentenceCore) {}

  async addSentence(dictionaryId: string, data: ISentenceCore) {}

  async deleteSentence(dictionaryId: string, sentenceId: string) {}

  // Note
  async getNote(dictionaryId: string) {
    return this.noteRepo.find({ dictionary: dictionaryId });
  }

  async editNote(dictionaryId: string, data: INoteCore) {}

  async addNote(dictionaryId: string, data: INoteCore) {}

  async deleteNote(dictionaryId: string, sentenceId: string) {}
}
