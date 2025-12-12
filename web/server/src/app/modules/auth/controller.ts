import {
  catchAsync,
  createUserTokens,
  HTTP_CODE,
  sendResponse,
  setAuthCookie,
} from '@/shared';
import * as service from './service';

export const signInUser = catchAsync(async (req, res) => {
  const user = await service.signInUser(req.body);

  const tokens = createUserTokens(user);

  setAuthCookie(res, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: `Sign in successful`,
    data: { ...user, tokens },
  });
});

export const signUpUser = catchAsync(async (req, res) => {
  const user = await service.signUpUser(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.CREATED,
    message:
      'Account created successfully! Please check your email to verify your account.',
    data: user,
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const result = await service.forgotPassword(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Password reset OTP sent to your email',
    data: result,
  });
});

export const verifyOtp = catchAsync(async (req, res) => {
  const result = await service.verifyOtp(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'OTP verified successfully',
    data: result,
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const result = await service.resetPassword(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Password reset successfully',
    data: result,
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const result = await service.verifyEmail(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Email verified successfully',
    data: result,
  });
});

export const verifyEmailOtp = catchAsync(async (req, res) => {
  const result = await service.verifyEmailOtp(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Email verified successfully',
    data: result,
  });
});

export const resendOtp = catchAsync(async (req, res) => {
  const result = await service.resendOtp(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'OTP sent successfully',
    data: result,
  });
});

export const signOutUser = catchAsync(async (_req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 0,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 0,
  });
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Signed out successfully!',
  });
});
