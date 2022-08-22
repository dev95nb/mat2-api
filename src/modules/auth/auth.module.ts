import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAtStrategy, JwtRtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      signOptions: { algorithm: 'RS256' },
    }),
    MongooseModule.forFeature([
      { name: AuthSchema.name, schema: AuthSchema.schema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtRtStrategy, AuthRepository],
})
export class AuthModule {}
