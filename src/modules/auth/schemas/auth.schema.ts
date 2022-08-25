import { Schema } from 'mongoose';

const SessionSchema = {
  name: 'session',
  schema: new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      openId: {
        type: String,
        required: true,
      },
      method: {
        type: String,
        enum: ['GOOGLE', 'FACEBOOK', 'APPLE'],
        required: true,
      },
      deviceId: {
        type: String,
      },
      os: {
        type: String,
        enum: ['IOS', 'ANDROID'],
      },
      refreshToken: {
        type: String,
        required: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    },
  ),
};

export { SessionSchema };
