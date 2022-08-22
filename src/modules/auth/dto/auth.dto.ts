import { IsString, MaxLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MaxLength(50)
  method: string;

  @IsString()
  token: string;

  @IsString()
  @MaxLength(50)
  deviceId: string;

  @IsString()
  @MaxLength(50)
  os: string;
}
