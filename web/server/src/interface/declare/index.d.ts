import { Role } from '@/app/modules/user/interface';

export interface IJwtUserPayload {
  userId: string;
  email: string;
  role: Role;
  name?: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: IJwtUserPayload;
    }
  }
}
