import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class B2Config {
  @Prop()
  token: string;

  @Prop()
  updatedAt: number;
}

const B2ConfigSchema = SchemaFactory.createForClass(B2Config);

export type ConfigAppSchema = ConfigApp & Document;

@Schema()
export class ConfigApp {
  @Prop({ type: B2ConfigSchema })
  b2: B2Config;
}

export const ConfigAppSchema = SchemaFactory.createForClass(ConfigApp);
