import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import type { IJwtUserPayload } from '@/interface';

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => jwt.sign(payload, secret, { expiresIn } as SignOptions);

export const verifyToken = (token: string, secret: string) =>
  jwt.verify(token, secret) as IJwtUserPayload;
