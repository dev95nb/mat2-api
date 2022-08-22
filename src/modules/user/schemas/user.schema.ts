import { Schema } from 'mongoose';

const UserSchema = {
  name: 'user',
  schema: new Schema(
    {
      name: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
        default: 'ACTIVE',
      },
      isDark: {
        type: Boolean,
        required: false,
      },
      language: {
        type: String,
        enum: ['vi', 'en'],
      },
    },
    {
      timestamps: true,
    },
  ),
};

export { UserSchema };
