import type { Response } from 'express';
import { ENV } from '@/config';

export const setAuthCookie = (
  res: Response,
  tokenInfo: {
    accessToken?: string;
    refreshToken?: string;
  }
) => {
  if (tokenInfo.accessToken) {
    res.cookie('accessToken', tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ENV.ACCESS_COOKIE_EXPIRE_TIME,
    });
  }
  if (tokenInfo.refreshToken) {
    res.cookie('refreshToken', tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ENV.REFRESH_COOKIE_EXPIRE_TIME,
    });
  }
};
