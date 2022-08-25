export interface INotificationSetting {
  notificationSettingId?: string;
  value?: boolean;
}

export interface IUserCore {
  name?: string;
  openId?: string[];
  status?: string;
  isDark?: boolean;
  language?: string;
  notificationSetting?: Array<INotificationSetting>;
}

export interface IUser extends IUserCore {
  userId?: string;
  _id?: string;
}

export interface INotificationSettingCore {
  en?: {
    name?: string;
  };
  status?: string;
  value?: boolean;
}

export interface INotificationCore {
  notificationTemplate?: string;
  nameValue?: [
    {
      key?: string;
      value?: string;
    },
  ];
  contentValue?: [
    {
      key?: string;
      value?: string;
    },
  ];
  status: string;
  type: string;
  createdAt: string;
}
