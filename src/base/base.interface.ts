import { Model, Document } from 'mongoose';

export interface ICustomMongoModel<T extends Document> extends Model<T> {
  aggregatePaginate(query: any, options: any): Promise<T[]>;
}
