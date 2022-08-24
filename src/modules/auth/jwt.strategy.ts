import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AUTH_TOKEN_TYPE } from '$constants/common';

const publicKey =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwSDV7AvAPdaen7O+BEDP\nnCgBOT7aEp1n4yroui618twomVRZFEc7saGePWipcpYlwFPv35v3DgCu7BSqWS3L\nvHBlz8a3ndqWzHiH2am+hyWmOwHnWBP75PCa/ORchRisW9QqQj7/yLdt1EnC+zVP\n2iY3VOheFnmdrE6U47Blz/UdK6uFco1UK6aHt4VGXJ48c1RCUlORyVLkXj4sltNt\nBZZ75BOaId+U78O7AmTxyI9InxhX+a2IrSuQ9c1oV3wonCikw/9W5CK/hm4VY2iN\noHbYS9G8YpccmL0egTl3CnaNJjaxs3xVLOnXu4qeUsVNj3aldXA5lM/QgepLnR6l\n2wIDAQAB\n-----END PUBLIC KEY-----';

interface _IPayload {
  userId: string;
  sessionId: string;
}

@Injectable()
export class JwtAtStrategy extends PassportStrategy(
  Strategy,
  AUTH_TOKEN_TYPE.JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: _IPayload) {
    return { userId: payload.userId };
  }
}

@Injectable()
export class JwtRtStrategy extends PassportStrategy(
  Strategy,
  AUTH_TOKEN_TYPE.REFRESH,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: _IPayload) {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
      refreshToken,
    };
  }
}
