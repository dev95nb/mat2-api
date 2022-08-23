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
} from './schemas/dictionary.schema';
@Injectable()
export class DictionaryRepository extends BaseRepository<IDictionaryModel> {
  constructor(@InjectModel(DescriptionSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }

  async getUserByOpenId(openId: string) {
    return this.model.findOne({ openId }).lean();
  }

  async searchWord(word: string) {
    return this.model.find({ word: { $regex: word, $options: 'i' } }).limit(20);
  }
}

@Injectable()
export class PronunciationRepository extends BaseRepository<IPronunciationModel> {
  constructor(@InjectModel(PronunciationSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class TranslateRepository extends BaseRepository<ITranslateModel> {
  constructor(@InjectModel(TranslateSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class DescriptionRepository extends BaseRepository<IDescriptionModel> {
  constructor(@InjectModel(DescriptionSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class ClassRepository extends BaseRepository<IClassModel> {
  constructor(@InjectModel(ClassSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class VideoRepository extends BaseRepository<IVideoModel> {
  constructor(@InjectModel(VideoSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class SentenceRepository extends BaseRepository<ISentenceModel> {
  constructor(@InjectModel(SentenceSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}

@Injectable()
export class NoteRepository extends BaseRepository<INoteModel> {
  constructor(@InjectModel(NoteSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }
}
