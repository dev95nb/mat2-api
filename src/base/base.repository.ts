import { Document, Model } from 'mongoose';
import { EventEmitter } from 'events';
import { ICustomMongoModel } from './base.interface';

export class BaseRepository<T extends Document> extends EventEmitter {
  constructor(protected readonly model: ICustomMongoModel<T>) {
    super();
    this.model = model;
  }

  async createOne(entity: any): Promise<T> {
    return new this.model(entity).save();
  }

  async deleteOne(filter: any) {
    return this.model.deleteOne(filter);
  }

  async find(obj: any, skip = 0, limit = 0): Promise<T> {
    return this.model.find(obj).skip(skip).limit(limit).lean();
  }

  async findOneById(id: string): Promise<T> {
    return this.model.findById(id).lean();
  }

  async findOne(filter: any, populate?: any) {
    const query = this.model.findOne(filter);
    if (populate && populate.length > 0) {
      for (const item of populate) {
        query.populate(item);
      }
    }
    return query.lean();
  }

  getModel(): Model<T> {
    return this.model;
  }

  async updateOneById(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data);
  }
}
