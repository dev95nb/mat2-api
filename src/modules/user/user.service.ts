import { buildNotificationSetting } from '$utils/common';
import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interfaces';
import {
  NotificationRepository,
  NotificationSettingRepository,
  UserRepository,
} from './user.repository';
@Injectable()
export class UserService {
  constructor(
    private readonly repo: UserRepository,
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationSettingRepository: NotificationSettingRepository,
  ) {}

  async createUser(userData: IUser) {
    return this.repo.createOne(userData);
  }

  async getDetailMe(userId: string, language: string) {
    const dataDetail = await this.repo.getDetailMe(userId);
    const notificationSetting = await this.notificationSettingRepository.find(
      {},
      ['status', 'value', language],
    );
    const listNotificationSetting = buildNotificationSetting(
      notificationSetting,
      dataDetail.notificationSetting,
      language,
    );
    dataDetail.notificationSetting = listNotificationSetting;
    return dataDetail;
  }

  async getUserById(userId: string) {
    return this.repo.getUserDetail(userId);
  }

  async getListNotification(userId: string, lang: string) {
    return this.notificationRepository.getListNotification(userId, lang);
  }

  async getUserByOpenId(openId: string) {
    return this.repo.getUserByOpenId(openId);
  }

  async updateUserDetail(userId: string, body: IUser) {
    await this.repo.updateOneById(userId, body);
    return this.repo.findOneById(userId);
  }
}
