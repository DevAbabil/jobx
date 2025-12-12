import { HTTP_CODE } from '../constants';
import { catchAsync, sendResponse } from '../util';

export const ping = catchAsync(async (_req, res) => {
  sendResponse(res, { success: true, status: HTTP_CODE.OK, message: 'pong' });
});
