import { Router } from 'express';
import * as modules from '@/app/modules';

const moduleRoutes: Array<Record<string, Router>> = [
  { auth: modules.authRoutes },
  { user: modules.userRoutes },
];

export default moduleRoutes.reduce((router, module) => {
  const [path, route] = Object.entries(module)[0];
  return router.use(`/${path}`, route);
}, Router());
