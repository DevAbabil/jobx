import { config } from 'dotenv';
import { envsafe, num, str } from 'envsafe';

config();

export const ENV = envsafe({
  PORT: num({ default: 3000 }),
  NODE_ENV: str({ choices: ['development', 'production'] }),

  WHITE_LIST_ORIGIN: str(),
  FRONTEND_URL: str(),
  BACKEND_URL: str(),

  DB_NAME: str(),
  DB_URI: str(),
  DB_USER: str(),
  DB_PASS: str(),

  LSA_USER: str(),
  LSA_PASS: str(),

  ROOT_ADMIN_NAME: str(),
  ROOT_ADMIN_PASSWORD: str(),
  ROOT_ADMIN_GMAIL: str(),

  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),

  JWT_ACCESS_EXPIRES: str(),
  JWT_REFRESH_EXPIRES: str(),

  ACCESS_COOKIE_EXPIRE_TIME: num(),
  REFRESH_COOKIE_EXPIRE_TIME: num(),

  VERCEL: str({ default: '0' }),

  JOBX_PRO_PRICE: num(),
  STRIPE_SECRET_KEY: str(),
});

export const IS_VERCEL = ENV.VERCEL === '1';
