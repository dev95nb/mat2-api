import { IUserCore } from './interfaces/user.interfaces';
import { Document } from 'mongoose';

export interface IUserModel extends Document, IUserCore {}
