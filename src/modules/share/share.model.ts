import { IShareCore } from './interfaces/share.interfaces';
import { Document } from 'mongoose';

export interface IShareModel extends Document, IShareCore {}
