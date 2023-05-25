export type IUserLibrary = IUserBook[];

export interface IUserBook {
  _id: string;
  user: string;
  isbn: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isRead: boolean;
  title?: string;
}
