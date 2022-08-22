import { IUserModel } from './user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { UserSchema } from './schemas/user.schema';
@Injectable()
export class UserRepository extends BaseRepository<IUserModel> {
  constructor(@InjectModel(UserSchema.name) model) {
    super(model);
  }

  async getUserDetail(userId: string) {
    return this.model.findById(userId).lean();
  }

  async getUserByOpenId(openId: string) {
    return this.model.findOne({ openId }).lean();
  }
}
