import { AppError } from "@/app/errors";
import { User } from "./model";
import { HTTP_CODE } from "@/shared";

export const me = async (userId: string) => {
  const user = await User.findById(userId).populate("picture");

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  const { password, ...rest } = user.toObject();

  return rest;
};

export const updatePicture = async (userId: string, pictureId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  user.picture = pictureId as any;
  await user.save();

  return await User.findById(userId).populate("picture").select("-password");
};
