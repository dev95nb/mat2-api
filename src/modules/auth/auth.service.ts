import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import appleSignin from 'apple-signin-auth';
import { IAuthCheck, IPayloadAuth } from './interfaces/auth.interface';
import { SessionRepository } from './auth.repository';
import { UserService } from '$modules/user/user.service';

const CLIENT_ID =
  '368688905199-6k4ijs68e6boe072s8bpnvtni1tcvsqs.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const privateKey =
  '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAwSDV7AvAPdaen7O+BEDPnCgBOT7aEp1n4yroui618twomVRZ\nFEc7saGePWipcpYlwFPv35v3DgCu7BSqWS3LvHBlz8a3ndqWzHiH2am+hyWmOwHn\nWBP75PCa/ORchRisW9QqQj7/yLdt1EnC+zVP2iY3VOheFnmdrE6U47Blz/UdK6uF\nco1UK6aHt4VGXJ48c1RCUlORyVLkXj4sltNtBZZ75BOaId+U78O7AmTxyI9InxhX\n+a2IrSuQ9c1oV3wonCikw/9W5CK/hm4VY2iNoHbYS9G8YpccmL0egTl3CnaNJjax\ns3xVLOnXu4qeUsVNj3aldXA5lM/QgepLnR6l2wIDAQABAoIBAAnvEXHZzOKhZnla\nenynhMZIfH+gTwFEHXLe4yeofW1ni6MPZqGXZGeno4cPGiAtvvVcm+sJj7Slrlmw\nWm7J3z/rHCGK3Cj/dGBCFuLIS2eSNTG10FuEc6F8CszVRjkGYt86U44ixW9imACi\nZqgbPuc+rfvtE+HeEZEqXZg0m5gNsZwpD/RUz3f81u3CtlYhoZxdFr7zWXUHnZo2\n5Jg8EwedU0WK+o5rOGY3xln6HhT5uwhvQ5GfPgrWKolKUYA1+DgDzFqrdhyVWkHd\nZ81sgJV8DUsmAwQFviGIoJMsxdXvlvLTHApsDsVZmdiuA+oCst1JP36EHxLhKpyj\n0yP4QdkCgYEA9cYkd+kLA3+fViRaxA1pIKvM6kxoqEuRXbMc7dG3pAQ7eR0oadCU\nsIkO+LUxxUceKGTWE4qlnu/W7Mb1JdENj3Gl+XaD18gq6nIx8yQ7VnFuQFNOognV\n9WyoZwdPHhBvbC9j1KIPOA/Ppr14FfToDsUrFK9uWaCemJh5189dpKcCgYEAySnw\nJc8DgeXL47Ba4GnKIEKnOymG8Q5+4IVF8IpHWxCrNs6lUJAJmJP0R3JMwwPsm1EY\nRW37aHsEfo6eVQPGu/LX//E6II7op/P8N0uvE1cVJBF5S0Aq7anIdnwq0kcnCHq6\n87v78hmBOsSE2yQthnsA2vyQEbIaxzqWhBIlt60CgYEAto+1PSDtXm7pQ4qDpYe0\npGEZOJ0DTKe9VhWbEoiqWXoPV1qyT09xc2SLq3CkhL7cBvNIFYHynonXY1AyfyG3\naerod9JyAtIcFsQ2mD48mWxukfePvEuEE+bffJBwU4uvyHO3OxYaKfGMtHWfAuhF\ni9snshjR5l+qDv2L3CObkpcCgYAqc2UwNV1iHiJGrEKhNPHomOg9fefyGsL/kmBO\nAIBKYVwgNr+AHsVHo4FbSm2UgdF+fUCH9kulosAyDNqwyhk4NGkMo9VGZaIHP1+s\nM5aAmFHnyKA2FxZ4DOo2xsEqmsVL7sphAPyL/IHe6vW2YQ4SYQavL7kfYtxvypdU\ny5eWCQKBgQCWmd+2SnTsS7dY+HF1DDBDmsvvGo9uRhBnOLwVMRiRRvFRbZIB4EHP\n7v6STF23u+KzxfeSW2J+/OkpaSd9XDefmWsTi4PUOm3HKQ7Em6Po5MaXnQ2pyMQl\ni7o6n/OuaZR7xUlGzDKy4gjcrBfoO0ZpDGgnNC+rOsExNEQNt60Bjg==\n-----END RSA PRIVATE KEY-----';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async googleLogin(token: string) {
    const getInfo = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const { payload } = getInfo.getAttributes();
    return {
      email: payload?.email,
      name: payload?.name,
      picture: payload?.picture,
      openId: payload.sub,
    };
  }

  private async facebookLogin(token: string) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/me',
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: token,
      },
    });
    console.log(data);
    return data;
  }

  private async appleLogin(token: string) {
    const { sub } = await appleSignin.verifyIdToken(token, {
      audience: 'com.company.app',
      nonce: 'NONCE',
      ignoreExpiration: true,
    });
  }

  private async phoneLogin(token: string) {}

  private async getToken(payload: IPayloadAuth) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60000 * 15,
        privateKey: privateKey,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60000 * 15,
        privateKey: privateKey,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async checkAuth(data: IAuthCheck) {
    try {
      const { method, token, deviceId, os } = data;
      const listAuthMethod = {
        GOOGLE: this.googleLogin,
        FACEBOOK: this.facebookLogin,
        APPLE: this.appleLogin,
        PHONE: this.phoneLogin,
        TEST: () => {
          return {
            openId: 'test',
          };
        },
      };

      const dataUser = await listAuthMethod[method](token);
      let userId = null;
      const openId = dataUser.openId;

      const user = await this.userService.getUserByOpenId(openId);

      if (user) {
        userId = user.id;
      } else {
        const user = await this.userService.createUser({
          openId,
        });
        userId = user.id;
      }

      let sessionId = null;
      const getSession = await this.sessionRepo.findSession(
        deviceId,
        openId,
        userId,
        os,
      );
      if (getSession) {
        sessionId = getSession._id.toString();
      } else {
        const createNewSession = await this.sessionRepo.createOne({
          openId,
          method: 'GOOGLE',
          os,
          deviceId,
          userId,
        });
        sessionId = createNewSession.id;
      }

      const payload = { userId, sessionId };
      const { accessToken, refreshToken } = await this.getToken(payload);

      await this.sessionRepo.updateOneById(sessionId, { refreshToken });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async renewToken(sessionId: string, userId: string, refreshToken: string) {
    const getSession = await this.sessionRepo.findOneById(sessionId);
    if (
      getSession &&
      refreshToken === getSession.refreshToken &&
      userId === getSession.userId.toString()
    ) {
      const payload = { userId, sessionId };
      const { accessToken, refreshToken } = await this.getToken(payload);
      await this.sessionRepo.updateOneById(sessionId, { refreshToken });
      return { accessToken, refreshToken };
    } else {
      throw new Error('');
    }
  }
}
