import { translateText } from '$utils/common';
import { ObjectId } from '$utils/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  IDescriptionCore,
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

  // translate
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

  // pronunciation
  async getPronunciation(dictionaryId: string, page: number, perPage: number) {
    return this.pronunciationRepo.getPronunciation(
      {
        dictionary: ObjectId(dictionaryId),
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

  // class
  async getClass(dictionaryId: string, page: number, perPage: number) {
    return this.classRepo.getClass(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editClass(
    userId: string,
    dictionaryId: string,
    classId: string,
    data: IClassCore,
  ) {
    return this.classRepo.editClass(
      { dictionary: dictionaryId, classId, creator: userId },
      data,
    );
  }

  async addClass(userId: string, dictionaryId: string, data: IClassCore) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.classRepo.addClass(obj);
  }

  async deleteClass(userId: string, dictionaryId: string, classId: string) {
    return this.classRepo.deleteClass({
      _id: classId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }

  // Sentence
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

  // Description
  async getDescription(dictionaryId: string, page: number, perPage: number) {
    return this.descriptionRepo.getDescription(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editDescription(
    userId: string,
    dictionaryId: string,
    noteId: string,
    data: IDescriptionCore,
  ) {
    return this.descriptionRepo.editDescription(
      { dictionary: dictionaryId, noteId, creator: userId },
      data,
    );
  }

  async addDescription(
    userId: string,
    dictionaryId: string,
    data: IDescriptionCore,
  ) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.descriptionRepo.addDescription(obj);
  }

  async deleteDescription(
    userId: string,
    dictionaryId: string,
    noteId: string,
  ) {
    return this.descriptionRepo.deleteDescription({
      _id: noteId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }

  // Note
  async getNote(dictionaryId: string, page: number, perPage: number) {
    return this.noteRepo.getNote(
      {
        dictionary: ObjectId(dictionaryId),
      },
      page,
      perPage,
    );
  }

  async editNote(
    userId: string,
    dictionaryId: string,
    noteId: string,
    data: INoteCore,
  ) {
    return this.noteRepo.editNote(
      { dictionary: dictionaryId, noteId, creator: userId },
      data,
    );
  }

  async addNote(userId: string, dictionaryId: string, data: INoteCore) {
    const obj = Object.assign(data, {
      dictionary: dictionaryId,
      creator: userId,
    });
    return this.noteRepo.addNote(obj);
  }

  async deleteNote(userId: string, dictionaryId: string, noteId: string) {
    return this.noteRepo.deleteNote({
      _id: noteId,
      dictionary: dictionaryId,
      creator: userId,
    });
  }
}
