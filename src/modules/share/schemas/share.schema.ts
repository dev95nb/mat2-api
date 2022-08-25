import { Schema } from 'mongoose';

const ShareSchema = {
  name: 'Share',
  schema: new Schema(
    {
      name: {
        type: String,
        trim: true,
      },
      content: {
        type: String,
        trim: true,
      },
      chatContent: [
        {
          position: {
            type: String,
          },
          name: {
            type: String,
          },
          message: {
            type: String,
          },
          messageType: {
            type: String,
            enum: ['TEXT', 'IMAGE'],
            default: 'TEXT',
          },
        },
      ],
      status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
        default: 'ACTIVE',
      },
      type: {
        type: String,
        enum: ['CHAT', 'STORY'],
      },
    },
    {
      timestamps: true,
    },
  ),
};

export { ShareSchema };
