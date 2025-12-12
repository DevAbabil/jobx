import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';
import * as service from './service';

export const generateOtp = catchAsync(async (req, res) => {
  const result = await service.generateOtp(req.body);

  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'OTP generated and sent successfully',
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
