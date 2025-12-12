import { Router } from 'express';
import { checkAuth, validateRequest } from '@/app/middlewares';
import { Role } from '../user/interface';
import * as controller from './controller';
import * as validator from './validation';

const router = Router();

router.post(
  '/intent',
  checkAuth(Role.USER),
  validateRequest(validator.zPaymentIntentSchema),
  controller.createInted
);

router.post(
  '/update-status',
  checkAuth(Role.USER),
  validateRequest(validator.zPaymentStatusUpdateSchema),
  controller.updatePaymentStatus
);

export default router;
