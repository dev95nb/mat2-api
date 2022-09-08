export interface IDictionaryCore {
  word?: string;
  source?: string;
  isAI?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDictionary extends IDictionaryCore {
  _id?: string;
}

export interface IPronunciationCore {
  speakStyle?: string;
  ipa?: string;
  audio?: string;
  isVerify?: boolean;
}

export interface IPronunciation extends IPronunciationCore {
  _id?: string;
}

export interface ITranslateCore {
  toLanguage?: string;
  translateValue?: string;
}

export interface ITranslate extends ITranslateCore {
  _id?: string;
}

export interface IDescriptionCore {
  toLanguage?: string;
  translateValue?: string;
}

export interface IDescription extends IDescriptionCore {
  _id?: string;
}

export interface IClassCore {
  className?: string;
  toLanguage?: string;
  translateValue?: string;
}

export interface IClass extends IClassCore {
  _id?: string;
}

export interface IVideoCore {
  word?: string;
  language?: string;
}

export interface IVideo extends IVideoCore {
  _id?: string;
}

export interface ISentenceCore {
  original?: string;
  translateValue?: string;
  toLanguage?: string;
}

export interface ISentence extends ISentenceCore {
  _id?: string;
}

export interface INoteCore {
  content?: string;
}

export interface INote extends INoteCore {
  _id?: string;
}

export interface IDescriptionCore {
  content?: string;
}

export interface IDescription extends IDescriptionCore {
  _id?: string;
}
