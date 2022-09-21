import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionSchema = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  openId: string;

  @Prop({ required: true, enum: ['GOOGLE', 'FACEBOOK', 'APPLE'] })
  method: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true, enum: ['IOS', 'ANDROID'] })
  os: string;

  @Prop({ unique: true })
  refreshToken: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
