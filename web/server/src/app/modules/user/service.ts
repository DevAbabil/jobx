import bcrypt from 'bcryptjs';
import { AppError } from '@/app/errors';
import { HTTP_CODE } from '@/shared';
import { User } from './model';

export const me = async (userId: string) => {
  const user = await User.findById(userId).populate('picture');

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  const { password, ...rest } = user.toObject();

  return rest;
};

export const updatePicture = async (userId: string, pictureId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  user.picture = pictureId;
  await user.save();

  return await User.findById(userId).populate('picture').select('-password');
};

export const updateProfile = async (
  userId: string,
  updateData: { name?: string; picture?: string }
) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  // Update the fields
  if (updateData.name) user.name = updateData.name;
  if (updateData.picture !== undefined) user.picture = updateData.picture;

  await user.save();

  return await User.findById(userId).select('-password');
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User not found`);

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new AppError(HTTP_CODE.BAD_REQUEST, `Current password is incorrect`);
  }

  // Hash new password
  const saltRounds = 12;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  user.password = hashedNewPassword;
  await user.save();

  return { message: 'Password changed successfully' };
};
