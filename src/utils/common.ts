import { v2 } from '@google-cloud/translate';
import { INotificationSetting } from '$modules/user/interfaces/user.interfaces';

const { Translate } = v2;

const keyFile = {
  type: 'service_account',
  project_id: 'mat-2-359111',
  private_key_id: '15bfcf611302176393811717754f6267a67c7c61',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCOiYYG0VB1QOu+\nlyJ/JiLOYXzYFWF8MoS8+lzBMVEI8mq3CPv4h7mzISK0LckqJVD4halY3YhQNiYO\nRjcL2b6c4yvwQXNG/Dcyhk2HuW0cTavO5oAWuDLL7m+aEHCcJfgK732XazVrZY+6\ndaYfFADo/Pxph/kkdMiaTi+OIg29+O7+Jra5RFZD4vN9o+8i81r3A0SeZ6smI2aw\nISY2v/rcXPLBWFg5b0xnw4kSLdzJ3CavUSwQNpAfTtBm1pqrS1R+JICVCbnivLCF\nLWKxe15HlY7+JE3po3Eszudf9JnIYP6l0s1Efbtv1/evSYYF1ypN7NQt3J7RHl2p\nBdcGc64xAgMBAAECggEAJ8EOev9NH+7T8WvIqMrToVkKT2AjONcEM4rmbNGa5tJp\n1hPw5t+/+Mhwm+07MoCG5VGuKkVbO/fmREvsFWeNJMetXQx8INu+b16K6CRc3KyD\nEykxp2SHcl5VjRQxvDNQy4gBMMardwE0BY7Dnt5e5JyOr8ZHRBY4TuUomU1BJO8K\n4lX1ckqMf+E80+7+vCrDc8MXYzPhnbwMAsDdbPSIjS8q3wJw/G42PPiN6tU3Jm2L\nN2CjlTApJGD1lLvrWgddFevxo95D+xhJvOIgQXXQWa1NC/TaW2rqjKCFQmK04PlF\nxcDK1sO0/TnMh7vtcLnnc9FJe8FIMYAjQqB8h/L7CwKBgQDGmo9WzoedkorhQFnZ\nKOPcnfHx+hZKPdTzQ2UvKo+b8mZzjsu/B0YB18D7bJB43kAv3VWanlQfyykXckKB\nFaAj/CNgxxziUgq3kxrqSLSXMdUn3zdICDbc0J4lqk+ESICv/J9W9zh+rATxMRtj\n49s+tCb/Vzb/9CAvuFPZ07wYHwKBgQC3uvP2FKfiWJ9pmLLtySHaZhz69pGN7TTC\n5Rers02vKZug1EmjWEDowmeeZizHdKL3Aqr855j5pTPyFpV8O7jiohOeH3Pg4X8O\nxVOPIAKBw8Zt1wB8e4mAXBA8yM/YnW7IM1YsbAFD1rMhlgvU07zEU3nG9VmwuS0W\nWeiIB16vrwKBgBEHIXEM5h3BebzUWp++3MKGnD7l9VFKOd7dkWhY2tVBFD2mKZvo\nUL1JtVcZOM3UKGayMGvAVXAgaBaFimQs6X0MWjArAjP5Wsfgifc6YplwAVmYztGT\nOrj1/gk2r/ikirwMCdFYAvUBZK8VScbnu12F7q4H2URatwPAZxgPClp7AoGBAJTQ\n5efNRUpt0/k5CLzXbAc1LIYOD0lw94pg+zJE0khtoDO9n0OiKTketcU0J1MK4zDF\nxW+Bu4OBzzhoGH5+9TsEYnVyLm7Y1wxEwnCsUbt/soqnWip5+Z6xcyl40fk3U1Lv\nWf4zITcsgP1URpMFSeGPZ5TCh/o/kwiGnHUJ2yTbAoGAEK315oWPD6+02xUJVMNA\nzmMASnHLLCg5fycIPYJTt9eiaavSAXJWFiC4UL8XM/XcSNY63HUWjNtDkHwIVfrk\nmqaWSO/Nwoh72tPKFCc9cVEJeWLzs6dG5sQbsq0tItfD2KDl3SsZ5E5lugGjpIG3\nriuFR/srfsCasaJYu92sdos=\n-----END PRIVATE KEY-----\n',
  client_email: 'translate-api-dev@mat-2-359111.iam.gserviceaccount.com',
  client_id: '109201660309487992629',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/translate-api-dev%40mat-2-359111.iam.gserviceaccount.com',
};

const translate = new Translate({
  projectId: 'mat-2-359111',
  credentials: keyFile,
});

export const buildNotificationSetting = (
  notificationSettingDefault: any,
  notificationSetting: INotificationSetting[] = [],
  language: string,
) => {
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

export const translateText = async (text: string, lang: string) => {
  return translate.translate(text, lang);
};
