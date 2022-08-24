import { aggregatePaginatePLugin } from '$utils/mongoose';
import { Schema } from 'mongoose';

const DictionarySchema = {
  name: 'Dictionary',
  schema: new Schema(
    {
      word: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      source: {
        type: String,
      },
      destination: {
        type: String,
      },
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    },
    {
      timestamps: true,
    },
  ),
};

const PronunciationSchema = {
  name: 'Pronunciation',
  schema: new Schema(
    {
      speakStyle: String,
      ipa: String,
      audio: String,
      isVerify: Boolean,
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

const TranslateSchema = {
  name: 'Translate',
  schema: new Schema(
    {
      toLanguage: String,
      translateValue: {
        type: String,
        unique: true,
      },
      isVerify: Boolean,
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

const DescriptionSchema = {
  name: 'Description',
  schema: new Schema(
    {
      description: String,
      toLanguage: String,
      isVerify: Boolean,
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

const ClassSchema = {
  name: 'Class',
  schema: new Schema(
    {
      className: String,
      description: String,
      isVerify: Boolean,
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      example: {
        original: String,
        translateValue: String,
        toLanguage: String,
      },
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

const VideoSchema = {
  name: 'Video',
  schema: new Schema(
    {
      videoId: {
        type: String,
        index: true,
      },
      typeVideo: {
        type: String,
      },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
    },
    { timestamps: true },
  ),
};

const SentenceSchema = {
  name: 'Sentence',
  schema: new Schema(
    {
      original: String,
      translateValue: String,
      toLanguage: String,
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

const NoteSchema = {
  name: 'Note',
  schema: new Schema(
    {
      content: String,
      creator: { type: Schema.Types.ObjectId, ref: 'User', index: true },
      dictionary: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
        index: true,
      },
    },
    { timestamps: true },
  ),
};

TranslateSchema.schema.plugin(aggregatePaginatePLugin);
DescriptionSchema.schema.plugin(aggregatePaginatePLugin);
PronunciationSchema.schema.plugin(aggregatePaginatePLugin);
ClassSchema.schema.plugin(aggregatePaginatePLugin);
SentenceSchema.schema.plugin(aggregatePaginatePLugin);
NoteSchema.schema.plugin(aggregatePaginatePLugin);

export {
  DictionarySchema,
  PronunciationSchema,
  TranslateSchema,
  DescriptionSchema,
  ClassSchema,
  VideoSchema,
  SentenceSchema,
  NoteSchema,
};
