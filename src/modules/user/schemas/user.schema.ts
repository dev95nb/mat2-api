import { Schema } from 'mongoose';

const NotificationSettingSchema = {
  name: 'NotificationSetting',
  schema: new Schema(
    {
      en: {
        name: {
          type: String,
          trim: true,
        },
      },
      status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
      },
      value: {
        type: Boolean,
      },
    },
    {
      timestamps: true,
    },
  ),
};

const UserSchema = {
  name: 'User',
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
      openId: {
        type: Array,
      },
      isDark: {
        type: Boolean,
        required: false,
      },
      language: {
        type: String,
        enum: ['vi', 'en'],
      },
      notificationSetting: [
        {
          notificationSettingId: String,
          value: Boolean,
        },
      ],
    },
    {
      timestamps: true,
    },
  ),
};

const NotificationTemplateSchema = {
  name: 'NotificationTemplate',
  schema: new Schema(
    {
      en: {
        name: {
          type: String,
          trim: true,
        },
        content: {
          type: String,
          trim: true,
        },
      },
    },
    {
      timestamps: true,
    },
  ),
};

const NotificationSchema = {
  name: 'Notification',
  schema: new Schema(
    {
      notificationTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'NotificationTemplate',
        index: true,
      },
      nameValue: [
        {
          key: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
      contentValue: [
        {
          key: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
      status: {
        type: String,
        enum: ['READ', 'UNREAD'],
        default: 'UNREAD',
      },
      type: {
        type: String,
        enum: ['USER', 'GLOBAL'],
        default: 'USER',
      },
      user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    },
    {
      timestamps: true,
    },
  ),
};

export {
  UserSchema,
  NotificationSchema,
  NotificationSettingSchema,
  NotificationTemplateSchema,
};
