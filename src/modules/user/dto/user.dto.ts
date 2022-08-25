import { IsEnum, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UserDto {
  name?: string;
  openId?: string;
  status?: string;
}

export class UserEditDto {
  @IsBoolean()
  @IsOptional()
  isDark?: boolean;

  @IsEnum(['en', 'vi'])
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
