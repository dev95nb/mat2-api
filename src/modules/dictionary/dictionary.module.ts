import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { aggregatePaginatePLugin } from '$utils/mongoose';

import {
  Dictionary,
  DictionarySchema,
  Pronunciation,
  PronunciationSchema,
  Translate,
  TranslateSchema,
  Description,
  DescriptionSchema,
  Class,
  ClassSchema,
  Sentence,
  SentenceSchema,
  Note,
  NoteSchema,
} from './schemas/dictionary.schema';
import { DictionaryRepository } from './dictionary.repository';

import {
  ClassRepository,
  DescriptionRepository,
  NoteRepository,
  PronunciationRepository,
  SentenceRepository,
  TranslateRepository,
} from './repository';
import {
  ClassService,
  DescriptionService,
  NoteService,
  PronunciationService,
  SentenceService,
  TranslateService,
} from './services';
import {
  ClassController,
  DescriptionController,
  NoteController,
  PronunciationController,
  SentenceController,
  TranslateController,
} from './controllers';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Dictionary.name,
        useFactory: () => {
          const schema = DictionarySchema;
          return schema;
        },
      },
      {
        name: Pronunciation.name,
        useFactory: () => {
          const schema = PronunciationSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
      {
        name: Translate.name,
        useFactory: () => {
          const schema = TranslateSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
      {
        name: Description.name,
        useFactory: () => {
          const schema = DescriptionSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
      {
        name: Class.name,
        useFactory: () => {
          const schema = ClassSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
      {
        name: Sentence.name,
        useFactory: () => {
          const schema = SentenceSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
      {
        name: Note.name,
        useFactory: () => {
          const schema = NoteSchema;
          schema.plugin(aggregatePaginatePLugin);
          return schema;
        },
      },
    ]),
  ],
  controllers: [
    DictionaryController,
    ClassController,
    DescriptionController,
    NoteController,
    PronunciationController,
    SentenceController,
    TranslateController,
  ],
  providers: [
    DictionaryService,
    ClassService,
    DescriptionService,
    NoteService,
    PronunciationService,
    SentenceService,
    TranslateService,
    DictionaryRepository,
    PronunciationRepository,
    TranslateRepository,
    DescriptionRepository,
    ClassRepository,
    SentenceRepository,
    NoteRepository,
  ],
})
export class DictionaryModule {}
