export interface IShareCore {
  name?: string;
  openId?: string[];
  status?: string;
  isDark?: boolean;
  language?: string;
}

export interface IShare extends IShareCore {
  userId?: string;
  _id?: string;
}
