import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class _Content {
  @Prop()
  lang: string;

  @Prop()
  title: string;
}

const _ContentSchema = SchemaFactory.createForClass(_Content);

export type NotificationSettingSchema = NotificationSetting & Document;

@Schema({ timestamps: true })
export class NotificationSetting {
  @Prop({ type: [_ContentSchema] })
  text: _Content[];

  @Prop({ enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
  status: string;

  @Prop()
  value: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;
}

export const NotificationSettingSchema =
  SchemaFactory.createForClass(NotificationSetting);

export type UserSchema = User & Document;

@Schema()
export class _NotificationSetting {
  @Prop()
  notificationSettingId: string;

  @Prop()
  value: boolean;
}

const _NotificationSettingSchema =
  SchemaFactory.createForClass(_NotificationSetting);
@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true })
  name: string;

  @Prop({ enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'], default: 'ACTIVE' })
  status: string;

  @Prop()
  openId: string[];

  @Prop({ default: false })
  isDark: boolean;

  @Prop({ enum: ['vi', 'en'] })
  language: string;

  @Prop({ type: [_NotificationSettingSchema] })
  notificationSetting: _NotificationSetting[];
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class _ContentNotificationTemplate {
  @Prop()
  lang: string;

  @Prop()
  name: string;

  @Prop()
  content: string;
}

const _ContentNotificationTemplateSchema = SchemaFactory.createForClass(
  _ContentNotificationTemplate,
);

export type NotificationTemplateSchema = NotificationTemplate & Document;

@Schema({ timestamps: true })
export class NotificationTemplate {
  @Prop({ type: [_ContentNotificationTemplateSchema] })
  text: _ContentNotificationTemplate[];
}

export const NotificationTemplateSchema =
  SchemaFactory.createForClass(NotificationTemplate);

@Schema()
export class _ValueNotification {
  @Prop()
  key: string;

  @Prop()
  value: string;
}

const _ValueNotificationSchema =
  SchemaFactory.createForClass(_ValueNotification);

export type NotificationSchema = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: [_ValueNotificationSchema] })
  title: _ValueNotification[];

  @Prop({ type: [_ValueNotificationSchema] })
  content: _ValueNotification[];

  @Prop({ enum: ['READ', 'UNREAD'] })
  status: string;

  @Prop({ enum: ['USER', 'GLOBAL'] })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NotificationTemplate' })
  notificationTemplate: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
