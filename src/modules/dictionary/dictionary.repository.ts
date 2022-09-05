import {
  IDictionaryModel,
  ITranslateModel,
  IPronunciationModel,
  IDescriptionModel,
  IClassModel,
  IVideoModel,
  ISentenceModel,
  INoteModel,
} from './dictionary.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import {
  DescriptionSchema,
  TranslateSchema,
  PronunciationSchema,
  ClassSchema,
  SentenceSchema,
  VideoSchema,
  NoteSchema,
  DictionarySchema,
} from './schemas/dictionary.schema';
import {
  IClassCore,
  IDescriptionCore,
  INoteCore,
  IPronunciationCore,
  ISentenceCore,
  ITranslateCore,
} from './interfaces/dictionary.interfaces';
@Injectable()
export class DictionaryRepository extends BaseRepository<IDictionaryModel> {
  constructor(@InjectModel(DictionarySchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }

  async getUserByOpenId(openId: string) {
    return this.model.findOne({ openId }).lean();
  }

  async searchWord(word: string, source: string, destination: string) {
    return this.model
      .find({ word: { $regex: word, $options: 'i' }, source, destination })
      .limit(20);
  }
}

@Injectable()
export class PronunciationRepository extends BaseRepository<IPronunciationModel> {
  constructor(@InjectModel(PronunciationSchema.name) model) {
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

@Injectable()
export class TranslateRepository extends BaseRepository<ITranslateModel> {
  constructor(@InjectModel(TranslateSchema.name) model) {
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

@Injectable()
export class DescriptionRepository extends BaseRepository<IDescriptionModel> {
  constructor(@InjectModel(DescriptionSchema.name) model) {
    super(model);
  }

  async editDescription(filter: any, data: IDescriptionCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addDescription(data: any) {
    return this.model.create(data);
  }

  async deleteDescription(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getDescription(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}

@Injectable()
export class ClassRepository extends BaseRepository<IClassModel> {
  constructor(@InjectModel(ClassSchema.name) model) {
    super(model);
  }

  async editClass(filter: any, data: IClassCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addClass(data: any) {
    return this.model.create(data);
  }

  async deleteClass(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getClass(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}

@Injectable()
export class VideoRepository extends BaseRepository<IVideoModel> {
  constructor(@InjectModel(VideoSchema.name) model) {
    super(model);
  }
}

@Injectable()
export class SentenceRepository extends BaseRepository<ISentenceModel> {
  constructor(@InjectModel(SentenceSchema.name) model) {
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

@Injectable()
export class NoteRepository extends BaseRepository<INoteModel> {
  constructor(@InjectModel(NoteSchema.name) model) {
    super(model);
  }

  async editNote(filter: any, data: INoteCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addNote(data: any) {
    return this.model.create(data);
  }

  async deleteNote(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getNote(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
