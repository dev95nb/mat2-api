export interface IDictionaryCore {
  word?: string;
  language?: string;
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
  word?: string;
  language?: string;
}

export interface ITranslate extends ITranslateCore {
  _id?: string;
}

export interface IDescriptionCore {
  word?: string;
  language?: string;
}

export interface IDescription extends IDescriptionCore {
  _id?: string;
}

export interface IClassCore {
  word?: string;
  language?: string;
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
  word?: string;
  language?: string;
}

export interface ISentence extends ISentenceCore {
  _id?: string;
}

export interface INoteCore {
  word?: string;
  language?: string;
}

export interface INote extends INoteCore {
  _id?: string;
}
