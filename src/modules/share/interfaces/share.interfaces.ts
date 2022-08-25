export interface IShareCore {
  name?: string;
  content?: string;
  chatContent?: [
    {
      position: string;
      name: string;
      message: string;
      messageType: string;
    },
  ];
  status?: string;
  type?: string;
}

export interface IShare extends IShareCore {
  _id?: string;
}
