import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSchema,
  NotificationSettingSchema,
  NotificationSchema,
  NotificationTemplateSchema,
} from './schemas/user.schema';
import { UserController } from './user.controller';
import {
  NotificationRepository,
  NotificationSettingRepository,
  UserRepository,
} from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService,
    UserRepository,
    NotificationRepository,
    NotificationSettingRepository,
  ],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchema.schema },
      {
        name: NotificationSettingSchema.name,
        schema: NotificationSettingSchema.schema,
      },
      { name: NotificationSchema.name, schema: NotificationSchema.schema },
      {
        name: NotificationTemplateSchema.name,
        schema: NotificationTemplateSchema.schema,
      },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
