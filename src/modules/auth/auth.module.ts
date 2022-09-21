import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAtStrategy, JwtRtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, Session } from './schemas/auth.schema';
import { SessionRepository } from './auth.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { algorithm: 'RS256' },
    }),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtRtStrategy, SessionRepository],
})
export class AuthModule {}
