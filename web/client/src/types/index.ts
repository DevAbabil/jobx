export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPPER_ADMIN = 'SUPPER_ADMIN',
}

// Model Types Start.....
export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string | null;
  role: Role;
  isVerified?: boolean;
  isPro?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Model Types End.....

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export interface IResponse<T> {
  status: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data: T;
}
