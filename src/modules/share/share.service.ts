import { Injectable } from '@nestjs/common';
import { ShareRepository } from './share.repository';

@Injectable()
export class ShareService {
  constructor(private readonly repo: ShareRepository) {}

  async getListShare(userId: string, lang: string) {
    return this.repo.find({});
  }
}
