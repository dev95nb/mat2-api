import { Injectable } from '@nestjs/common';
import { IShareCore } from './interfaces/share.interfaces';
import { ShareRepository } from './share.repository';

@Injectable()
export class ShareService {
  constructor(private readonly repo: ShareRepository) {}

  async getListShare(
    userId: string,
    lang: string,
    page: number,
    perPage: number,
  ) {
    return this.repo.getListShare(userId, lang, page, perPage);
  }

  // Story
  async createStory(userId: string, data: IShareCore) {
    return this.repo.createOne(Object.assign(data, { creator: userId }));
  }

  async editStory(userId: string, storyId: string, data: IShareCore) {
    await this.repo.updateOne({ creator: userId, _id: storyId }, data);
    return this.repo.findOne({ creator: userId, _id: storyId });
  }

  async getStory(userId: string, storyId: string) {
    return this.repo.findOneById(storyId);
  }

  async deleteStory(userId: string, storyId: string) {
    return this.repo.deleteOne({ creator: userId, _id: storyId });
  }

  // Chat

  async createChat(userId: string, data: IShareCore) {
    return this.repo.createOne(Object.assign(data, { creator: userId }));
  }

  async editChat(userId: string, chatId: string, data: IShareCore) {
    await this.repo.updateOne({ creator: userId, _id: chatId }, data);
    return this.repo.findOne({ creator: userId, _id: chatId });
  }

  async getChat(userId: string, chatId: string) {
    return this.repo.findOneById(chatId);
  }

  async deleteChat(userId: string, chatId: string) {
    return this.repo.deleteOne({ creator: userId, _id: chatId });
  }
}
