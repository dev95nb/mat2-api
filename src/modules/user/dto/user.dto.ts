import { IsEnum, IsBoolean, IsOptional } from 'class-validator';

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
  language?: string;

  @IsEnum(['dot', 'comma'])
  @IsOptional()
  separator?: string;

  @IsEnum(['left', 'right'])
  @IsOptional()
  currencyLocation?: string;
}
