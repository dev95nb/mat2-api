import { AUTH_TOKEN_TYPE } from '$constants/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_TOKEN_TYPE.JWT) {}

@Injectable()
export class JwtRTAuthGuard extends AuthGuard(AUTH_TOKEN_TYPE.REFRESH) {}
