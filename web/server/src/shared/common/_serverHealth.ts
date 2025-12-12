import { allowedOrigins, ENV, IS_VERCEL } from '@/config';
import { HTTP_CODE } from '@/shared/constants';
import { catchAsync, formatDuration, sendResponse } from '@/shared/util';

export const serverHealth = catchAsync(async (_, res) => {
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: 'Welcome to DevAbabil API',
    data: {
      environment: ENV.NODE_ENV,
      hosting: IS_VERCEL ? 'VERCEL' : 'LOCAL',
      uptime: formatDuration(process.uptime()),
      timestamp: new Date().toISOString(),
      whitelist: allowedOrigins,
    },
  });
});
