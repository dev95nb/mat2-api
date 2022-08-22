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
import { DictionaryRepository } from './dictionary.repository';

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
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryRepository],
})
export class DictionaryModule {}
