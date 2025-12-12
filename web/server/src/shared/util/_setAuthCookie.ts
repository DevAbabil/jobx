import { ENV } from "@/config";
import { Response } from "express";

export const setAuthCookie = (
  res: Response,
  tokenInfo: {
    accessToken?: string;
    refreshToken?: string;
  }
) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ENV.ACCESS_COOKIE_EXPIRE_TIME,
    });
  }
  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ENV.REFRESH_COOKIE_EXPIRE_TIME,
    });
  }
};
