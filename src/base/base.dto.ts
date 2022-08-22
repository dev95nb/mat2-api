import { IsInt, IsOptional, Max } from 'class-validator';

export class BodyListDataDto {
  @IsInt()
  @IsOptional()
  page: string;

  @IsInt()
  @IsOptional()
  @Max(100)
  pageSize: string;

  @IsOptional()
  filter: object;
}
