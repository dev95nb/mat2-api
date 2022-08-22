import { Injectable } from '@nestjs/common';
import { DictionaryRepository } from './dictionary.repository';
@Injectable()
export class DictionaryService {
  constructor(private readonly repo: DictionaryRepository) {}

  async createUser(userData: IUser) {
    return this.repo.createOne(userData);
  }

  async getUserById(userId: string) {
    return this.repo.getUserDetail(userId);
  }

  async getUserByOpenId(openId: string) {
    return this.repo.getUserByOpenId(openId);
  }

  async updateUserDetail(userId: string, body: IUser) {
    await this.repo.updateOneById(userId, body);
    return this.repo.findOneById(userId);
  }
}
