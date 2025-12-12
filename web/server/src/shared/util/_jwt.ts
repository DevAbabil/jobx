import { IJwtUserPayload } from "@/interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => jwt.sign(payload, secret, { expiresIn } as SignOptions);

export const verifyToken = (token: string, secret: string) =>
  jwt.verify(token, secret) as IJwtUserPayload;
