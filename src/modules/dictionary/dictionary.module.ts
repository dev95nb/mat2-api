import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DictionarySchema,
  PronunciationSchema,
  TranslateSchema,
  DescriptionSchema,
  ClassSchema,
  VideoSchema,
  SentenceSchema,
  NoteSchema,
} from './schemas/dictionary.schema';
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
import { ClassController } from './controllers/class.controller';
import { DescriptionController } from './controllers/description.controller';
import { NoteController } from './controllers/note.controller';
import { PronunciationController } from './controllers/pronunciation.controller';
import { SentenceController } from './controllers/sentence.controller';
import { TranslateController } from './controllers/translate.controller';
import { ClassService } from './services/class.service';
import { DescriptionService } from './services/description.service';
import { NoteService } from './services/note.service';
import { PronunciationService } from './services/pronunciation.service';
import { SentenceService } from './services/sentence.service';
import { TranslateService } from './services/translate.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DictionarySchema.name, schema: DictionarySchema.schema },
      { name: PronunciationSchema.name, schema: PronunciationSchema.schema },
      { name: TranslateSchema.name, schema: TranslateSchema.schema },
      { name: DescriptionSchema.name, schema: DescriptionSchema.schema },
      { name: ClassSchema.name, schema: ClassSchema.schema },
      { name: VideoSchema.name, schema: VideoSchema.schema },
      { name: SentenceSchema.name, schema: SentenceSchema.schema },
      { name: NoteSchema.name, schema: NoteSchema.schema },
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
    VideoRepository,
    SentenceRepository,
    NoteRepository,
  ],
})
export class DictionaryModule {}
