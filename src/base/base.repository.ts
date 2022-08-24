import { Document, Model } from 'mongoose';
import { EventEmitter } from 'events';
import { IAggregateOption } from './base.interface';

interface _ICustomMongoModel<T extends Document> extends Model<T> {
  aggregatePaginate(query: any, options: IAggregateOption): Promise<T[]>;
}

export class BaseRepository<T extends Document> extends EventEmitter {
  constructor(protected readonly model: _ICustomMongoModel<T>) {
    super();
    this.model = model;
  }

  async createOne(entity: any) {
    return new this.model(entity).save();
  }

  async deleteOne(filter: any) {
    return this.model.deleteOne(filter);
  }

  async find(filter: any) {
    return this.model.find(filter);
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
