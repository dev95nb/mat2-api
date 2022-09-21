import { IAuthModel } from './auth.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { Session } from './schemas/auth.schema';

@Injectable()
export class SessionRepository extends BaseRepository<IAuthModel> {
  constructor(@InjectModel(Session.name) model) {
    super(model);
  }

  async findSession(
    deviceId: string,
    sessionId: string,
    userId: string,
    os: string,
  ) {
    return this.model.findOne({ id: sessionId, deviceId, userId, os }).lean();
  }
}
