import { IsString, MaxLength } from 'class-validator';

export class StoryDto {
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsString()
  @MaxLength(50)
  content?: string;

  chatContent: [
    {
      position: string;
      name: string;
      message: string;
      messageType: string;
    },
  ];

  type: string;
}

export class ChatDto {
  @IsString()
  @MaxLength(50)
  name?: string;

  chatContent: [
    {
      position: string;
      name: string;
      message: string;
      messageType: string;
    },
  ];

  type: string;
}
