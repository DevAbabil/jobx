export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPPER_ADMIN = "SUPPER_ADMIN",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  picture: string | null;
  role: Role;
}
