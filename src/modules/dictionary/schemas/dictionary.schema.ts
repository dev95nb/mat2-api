import { Schema } from 'mongoose';

const DictionarySchema = {
  name: 'Dictionary',
  schema: new Schema(
    {
      word: {
        type: String,
        required: true,
        unique: true,
      },
      language: {
        type: String,
      },
      creator: String,
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
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User' },
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
    },
    { timestamps: true },
  ),
};

const TranslateSchema = {
  name: 'Translate',
  schema: new Schema(
    {
      toLanguage: String,
      translateValue: String,
      isVerify: Boolean,
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User' },
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
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
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User' },
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
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
      verifyBy: { type: Schema.Types.ObjectId, ref: 'User' },
      example: {
        original: String,
        translateValue: String,
        toLanguage: String,
      },
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
    },
    { timestamps: true },
  ),
};

const VideoSchema = {
  name: 'Video',
  schema: new Schema(
    {
      videoId: String,
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
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
    },
    { timestamps: true },
  ),
};

const NoteSchema = {
  name: 'Note',
  schema: new Schema(
    {
      content: String,
      creator: { type: Schema.Types.ObjectId, ref: 'User' },
      dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary' },
    },
    { timestamps: true },
  ),
};

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
