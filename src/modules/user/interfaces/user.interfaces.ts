export interface IUserCore {
  name?: string;
  openId?: string;
  status?: string;
  isDark?: boolean;
  language?: string;
}

export interface IUser extends IUserCore {
  userId?: string;
  _id?: string;
}
