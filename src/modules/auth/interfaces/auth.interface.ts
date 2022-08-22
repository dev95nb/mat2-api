export interface IAuthCore {
  method?: string;
  deviceId?: string;
  os?: string;
  refreshToken?: string;
  userId?: string;
}

export interface IAuth extends IAuthCore {
  _id?: string;
}

export interface IAuthCheck {
  method?: string;
  token?: string;
  deviceId?: string;
  os?: string;
}

export interface IPayloadAuth {
  userId: string;
}
