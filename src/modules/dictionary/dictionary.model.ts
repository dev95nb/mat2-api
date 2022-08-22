import { IClassCore, IDictionaryCore, INoteCore, IPronunciationCore, ISentenceCore, ITranslateCore, IVideoCore } from './interfaces/dictionary.interfaces';
import { Document } from 'mongoose';

export interface IDictionaryModel extends Document, IDictionaryCore {}

export interface IPronunciationModel extends Document, IPronunciationCore {}

export interface ITranslateModel extends Document, ITranslateCore {}

export interface IDescriptionModel extends Document, IDictionaryCore {}

export interface IClassModel extends Document, IClassCore {}

export interface IVideoModel extends Document, IVideoCore {}

export interface ISentenceModel extends Document, ISentenceCore {}

export interface INoteModel extends Document, INoteCore {}