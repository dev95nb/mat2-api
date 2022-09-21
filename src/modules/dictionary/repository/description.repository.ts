import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { Description } from '../schemas/dictionary.schema';
import { IDescriptionModel } from '../dictionary.model';
import { IDescriptionCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class DescriptionRepository extends BaseRepository<IDescriptionModel> {
  constructor(@InjectModel(Description.name) model) {
    super(model);
  }

  async editDescription(filter: any, data: IDescriptionCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addDescription(data: any) {
    return this.model.create(data);
  }

  async deleteDescription(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getDescription(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
