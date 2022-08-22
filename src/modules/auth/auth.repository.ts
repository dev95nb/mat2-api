import { IAuthModel } from './auth.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../base/base.repository';
import { AuthSchema } from './schemas/auth.schema';

@Injectable()
export class AuthRepository extends BaseRepository<IAuthModel> {
  constructor(@InjectModel(AuthSchema.name) model) {
    super(model);
  }

  async findSession(deviceId: string, sessionId: string) {
    return this.model.findOne({ id: sessionId, deviceId }).lean();
  }
}
