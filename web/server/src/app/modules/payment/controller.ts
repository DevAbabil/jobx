import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';
import * as service from './service';

export const createInted = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment intend created',
    data: await service.createIntend(req.body.phone, req.user),
  });
});

export const updatePaymentStatus = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment status updated',
    data: await service.updatePaymentStatus(req.user.userId, req.body.status),
  });
});
