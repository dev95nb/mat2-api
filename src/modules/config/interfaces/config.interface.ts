export interface IB2 {
  token?: string;
  updatedAt?: Date;
}

export interface IConfigAppCore {
  b2?: IB2;
}

export interface IConfigApp extends IConfigAppCore {
  _id?: string;
}
