import { INotificationSetting } from '$modules/user/interfaces/user.interfaces';

export const buildNotificationSetting = function (
  notificationSettingDefault: any,
  notificationSetting: INotificationSetting[] = [],
  language: string,
) {
  const listNotificationSetting = {};
  for (const item of notificationSetting) {
    listNotificationSetting[item.notificationSettingId] = item.value;
  }

  const listNoti = [];
  for (const item of notificationSettingDefault) {
    const notificationId = item._id.toString();
    if (listNotificationSetting[notificationId] !== undefined) {
      item.value = listNotificationSetting[notificationId];
    }
    const data = Object.assign(item, item[language]);
    delete data[language];
    listNoti.push(data);
  }
  return listNoti;
};
