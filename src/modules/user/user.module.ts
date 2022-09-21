import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
  NotificationSetting,
  NotificationSettingSchema,
  Notification,
  NotificationSchema,
  NotificationTemplate,
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
      { name: User.name, schema: UserSchema },
      {
        name: NotificationSetting.name,
        schema: NotificationSettingSchema,
      },
      { name: Notification.name, schema: NotificationSchema },
      {
        name: NotificationTemplate.name,
        schema: NotificationTemplateSchema,
      },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
