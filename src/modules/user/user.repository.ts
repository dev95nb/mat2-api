import {
  INotificationModel,
  INotificationSettingModel,
  IUserModel,
} from './user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { Notification, User, NotificationSetting } from './schemas/user.schema';
@Injectable()
export class UserRepository extends BaseRepository<IUserModel> {
  constructor(@InjectModel(User.name) model) {
    super(model);
  }

  async getDetailMe(userId: string) {
    return this.model
      .findById(userId)
      .select([
        'name',
        'email',
        'status',
        'isDark',
        'language',
        'notificationSetting',
      ])
      .lean();
  }

  async getUserDetail(userId: string) {
    return this.model
      .findById(userId)
      .select(['name', 'email', 'status', 'isDark', 'language'])
      .lean();
  }

  async getUserByOpenId(openId: string) {
    return this.model.findOne({ openId });
  }
}

@Injectable()
export class NotificationSettingRepository extends BaseRepository<INotificationSettingModel> {
  constructor(@InjectModel(NotificationSetting.name) model) {
    super(model);
  }
}

@Injectable()
export class NotificationRepository extends BaseRepository<INotificationModel> {
  constructor(@InjectModel(Notification.name) model) {
    super(model);
  }

  async getListNotification(userId: string, lang: string) {
    const data = await this.model
      .find({ user: userId })
      .populate({ path: 'notificationTemplate', select: lang })
      .lean();
    const result = data.map((item) => {
      const valueTemplate = item.notificationTemplate[lang];
      let name = valueTemplate.name;
      let content = valueTemplate.content;
      for (const i of item.nameValue) {
        const regex = new RegExp(`{{${i.key}}}`, 'g');
        name = name.replace(regex, i.value);
      }

      for (const i of item.contentValue) {
        const regex = new RegExp(`{{${i.key}}}`, 'g');
        content = content.replace(regex, i.value);
      }

      return {
        status: item.status,
        type: item.type,
        _id: item._id.toString(),
        name,
        content,
        createdAt: item.createdAt,
      };
    });
    return result;
  }
}
