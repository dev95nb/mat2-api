import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class _ChatContent {
  @Prop()
  position: string;

  @Prop()
  name: string;

  @Prop()
  message: string;

  @Prop({ enum: ['TEXT', 'IMAGE'], default: 'TEXT' })
  messageType: string;
}

const _ChatContentSchema = SchemaFactory.createForClass(_ChatContent);

export type ShareSchema = Share & Document;
@Schema({ timestamps: true })
export class Share {
  @Prop({ trim: true })
  name: string;

  @Prop({ trim: true })
  content: string;

  @Prop({ type: [_ChatContentSchema] })
  chatContent: _ChatContent[];

  @Prop({ enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'], default: 'INACTIVE' })
  status: string;

  @Prop({ enum: ['CHAT', 'STORY'] })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: string;
}

export const ShareSchema = SchemaFactory.createForClass(Share);
