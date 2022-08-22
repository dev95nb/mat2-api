import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class TranslateDto {
  @IsString()
  @MaxLength(50)
  word?: string;

  @IsString()
  @MaxLength(50)
  language?: string;
}

export class PronunciationDto {
  @IsString()
  @MaxLength(50)
  speakStyle?: string;

  @IsString()
  @MaxLength(50)
  ipa?: string;

  @IsString()
  @MaxLength(50)
  audio?: string;

  @IsBoolean()
  isVerify?: boolean;
}

export class ClassDto {
  @IsString()
  @MaxLength(50)
  className?: string;

  @IsString()
  @MaxLength(100)
  description?: string;
}

export class DescriptionDto {
  @IsString()
  @MaxLength(50)
  toLanguage?: string;

  @IsString()
  @MaxLength(100)
  description?: string;
}

export class VideoDto {
  @IsString()
  @MaxLength(50)
  videoId?: string;

  @IsString()
  @MaxLength(50)
  typeVideo?: string;
}

export class SentenceDto {
  @IsString()
  @MaxLength(50)
  original?: string;

  @IsString()
  @MaxLength(100)
  translateValue?: string;

  @IsString()
  @MaxLength(50)
  toLanguage?: string;
}

export class NoteDto {
  @IsString()
  @MaxLength(100)
  content?: string;
}
