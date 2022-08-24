import { IConfigAppCore } from './interfaces/config.interface';
import { Document } from 'mongoose';

export interface IConfigModel extends Document, IConfigAppCore {}
