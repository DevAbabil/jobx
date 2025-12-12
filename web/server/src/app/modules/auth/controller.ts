import {
  catchAsync,
  createUserTokens,
  HTTP_CODE,
  sendResponse,
  setAuthCookie,
} from "@/shared";
import * as service from "./service";

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
    message: `Signup has been successful`,
    data: { ...user, tokens },
  });
});

export const signOutUser = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 0,
  });
  sendResponse(res, {
    success: true,
    status: HTTP_CODE.OK,
    message: "signout successfully!",
  });
});
