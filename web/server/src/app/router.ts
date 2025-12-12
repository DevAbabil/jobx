import { Router } from 'express';
import * as modules from '@/app/modules';

const moduleRoutes: Array<Record<string, Router>> = [
  { auth: modules.authRoutes },
  { user: modules.userRoutes },
  { otp: modules.otpRoutes },
  { payment: modules.paymentRoutes },
];

export default moduleRoutes.reduce((router, module) => {
  const [path, route] = Object.entries(module)[0];
  return router.use(`/${path}`, route);
}, Router());
