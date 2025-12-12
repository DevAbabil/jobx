import { AppError } from "@/app/errors";
import { IUser } from "../user/interface";
import { User } from "../user/model";
import { HTTP_CODE } from "@/shared";
import bcryptjs from "bcryptjs";

export const signInUser = async ({
  email,
  password,
}: Pick<IUser, "email" | "password">) => {
  const user = (
    await User.findOne({
      email: email,
    })
  )?.toObject() as IUser;

  if (!user)
    throw new AppError(HTTP_CODE.NOT_FOUND, `user does not exist to sign in!`);

  if (!bcryptjs.compareSync(password, user.password))
    throw new AppError(HTTP_CODE.BAD_REQUEST, `Password not correct!`);

  const { password: _, ...res } = user;

  return res as any;
};
