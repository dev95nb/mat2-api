import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '$base/base.repository';
import { Class } from '../schemas/dictionary.schema';
import { IClassModel } from '../dictionary.model';
import { IClassCore } from '../interfaces/dictionary.interfaces';

@Injectable()
export class ClassRepository extends BaseRepository<IClassModel> {
  constructor(@InjectModel(Class.name) model) {
    super(model);
  }

  async editClass(filter: any, data: IClassCore) {
    await this.model.updateOne(filter, data);
    return this.model.findOne(filter);
  }

  async addClass(data: any) {
    return this.model.create(data);
  }

  async deleteClass(filter: any) {
    return this.model.deleteOne(filter);
  }

  async getClass(match: any, page: number, perPage: number) {
    const query = this.model.aggregate([
      {
        $match: match,
      },
    ]);
    return this.model.aggregatePaginate(query, { page, perPage });
  }
}
