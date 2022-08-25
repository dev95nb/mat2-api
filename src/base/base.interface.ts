import { IUser } from '$modules/user/interfaces/user.interfaces';
import { Model, Document } from 'mongoose';

export interface IRequest extends Request {
  user: IUser;
}

export interface IQueryPagination {
  page: number;
  perPage: number;
}

export interface IAggregateOption {
  page?: number;
  perPage?: number;
  allowDiskUse?: boolean;
}
