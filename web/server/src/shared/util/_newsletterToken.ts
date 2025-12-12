import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "@/config";

export const newsletterToken = {
  create: (email: string) => {
    return jwt.sign({ email }, ENV.JWT_NEWSLETTER_SECRET, {
      expiresIn: ENV.JWT_NEWSLETTER_EXPIRES,
    } as SignOptions);
  },
  verify: (token: string) => {
    return jwt.verify(token, ENV.JWT_NEWSLETTER_SECRET) as { email: string };
  },
};
