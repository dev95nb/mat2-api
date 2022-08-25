import {
  INotificationSettingCore,
  INotificationCore,
  IUserCore,
} from './interfaces/user.interfaces';
import { Document } from 'mongoose';

export interface IUserModel extends Document, IUserCore {}

export interface INotificationSettingModel
  extends Document,
    INotificationSettingCore {}

export interface INotificationModel extends Document, INotificationCore {}
