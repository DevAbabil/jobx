import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';
import * as service from './service';

export const me = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `User profile data!`,
    data: await service.me(req.user.userId),
  });
});

export const updatePicture = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Profile picture updated successfully!`,
    data: await service.updatePicture(req.user.userId, req.body.pictureId),
  });
});

export const updateProfile = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Profile updated successfully!`,
    data: await service.updateProfile(req.user.userId, req.body),
  });
});

export const changePassword = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Password changed successfully!`,
    data: await service.changePassword(
      req.user.userId,
      req.body.currentPassword,
      req.body.newPassword
    ),
  });
});
