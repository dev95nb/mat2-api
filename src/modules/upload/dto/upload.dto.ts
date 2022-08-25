import { IsEnum } from 'class-validator';

export class DataUploadDto {
  @IsEnum(['image', 'video'])
  fileType: string;
}
