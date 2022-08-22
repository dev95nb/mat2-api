import { IAuthCore } from './interfaces/auth.interface';
import { Document } from 'mongoose';

export interface IAuthModel extends Document, IAuthCore {
  refreshToken?: string;
  userId?: string;
}
