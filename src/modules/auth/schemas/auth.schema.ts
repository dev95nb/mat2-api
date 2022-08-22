import { Schema } from 'mongoose';

const AuthSchema = {
  name: 'auth',
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
        required: true,
        unique: true,
      },
    },
    {
      timestamps: true,
    },
  ),
};

export { AuthSchema };
