import { User } from "@/app/modules/user/model";
import { ENV } from "@/config";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "@/app/errors";
import { IUser } from "@/app/modules/user/interface";
import { generateToken, verifyToken } from "./_jwt";
import { setAuthCookie } from "./_setAuthCookie";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    ENV.JWT_ACCESS_SECRET,
    ENV.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    ENV.JWT_REFRESH_SECRET,
    ENV.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefresh = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    ENV.JWT_REFRESH_SECRET
  ) as JwtPayload;

  let user = await User.findOne({ email: verifiedRefreshToken.email });

  if (!user) throw new AppError(404, "User not exist to getNewAccessToken");

  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user.role,
  };

  const accessToken = generateToken(jwtPayload, ENV.JWT_ACCESS_SECRET, "1d");

  setAuthCookie;

  return accessToken;
};
