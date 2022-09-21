import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DictionarySchema = Dictionary & Document;

@Schema({ timestamps: true })
export class Dictionary {
  @Prop({ required: true, unique: true, index: true })
  word: string;

  @Prop({ required: true })
  source: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);

export type PronunciationSchema = Dictionary & Document;
@Schema({ timestamps: true })
export class Pronunciation {
  @Prop()
  speakStyle: string;

  @Prop()
  ipa: string;

  @Prop()
  audio: string;

  @Prop()
  isVerify: boolean;

  @Prop()
  source: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  verifyBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const PronunciationSchema = SchemaFactory.createForClass(Pronunciation);

export type TranslateSchema = Translate & Document;
@Schema({ timestamps: true })
export class Translate {
  @Prop()
  toLanguage: string;

  @Prop({ unique: true })
  translateValue: string;

  @Prop()
  isVerify: boolean;

  @Prop()
  isAI: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  verifyBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const TranslateSchema = SchemaFactory.createForClass(Translate);

export type DescriptionSchema = Description & Document;
@Schema({ timestamps: true })
export class Description {
  @Prop({ unique: true })
  translateValue: string;

  @Prop()
  toLanguage: string;

  @Prop()
  isVerify: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  verifyBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const DescriptionSchema = SchemaFactory.createForClass(Description);

export type ClassSchema = Description & Document;
@Schema({ timestamps: true })
export class Class {
  @Prop()
  className: string;

  @Prop()
  toLanguage: string;

  @Prop({ unique: true })
  translateValue: string;

  @Prop()
  isVerify: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  verifyBy: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

export type SentenceSchema = Description & Document;
@Schema({ timestamps: true })
export class Sentence {
  @Prop()
  original: string;

  @Prop()
  toLanguage: string;

  @Prop({ unique: true })
  translateValue: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const SentenceSchema = SchemaFactory.createForClass(Sentence);

export type NoteSchema = Description & Document;
@Schema({ timestamps: true })
export class Note {
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Dictionary' })
  dictionary: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
