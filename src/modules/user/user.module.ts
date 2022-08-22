import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchema.schema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
