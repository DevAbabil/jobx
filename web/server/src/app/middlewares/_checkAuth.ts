import { AppError } from '@/app/errors';
import { User } from '@/app/modules/user/model';
import { ENV } from '@/config';
import {
  catchAsync,
  createNewAccessTokenWithRefresh,
  HTTP_CODE,
  setAuthCookie,
  verifyToken,
} from '@/shared';

export const checkAuth = (...authRoles: string[]) =>
  catchAsync(async (req, res, next) => {
    let [accessToken, refreshToken] = [
      req.cookies?.accessToken,
      req.cookies?.refreshToken,
    ];

    if (!accessToken && !refreshToken)
      throw new AppError(403, 'No Token Received!');

    if (!accessToken && refreshToken) {
      accessToken = await createNewAccessTokenWithRefresh(refreshToken);
      setAuthCookie(res, { accessToken, refreshToken });
    }

    const verifiedToken = verifyToken(accessToken, ENV.JWT_ACCESS_SECRET);

    const user = await User.findOne({ email: verifiedToken.email });

    if (!user) throw new AppError(HTTP_CODE.BAD_REQUEST, 'User does not Exist');

    if (!authRoles.includes(verifiedToken.role))
      throw new AppError(403, 'You are not permitted to view this route');

    req.user = { ...verifiedToken, name: user.name };

    return next();
  });
