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

router.post(
  '/verify-session',
  checkAuth(Role.USER),
  validateRequest(validator.zPaymentSessionVerifySchema),
  controller.verifyPaymentSession
);

router.get('/status', checkAuth(Role.USER), controller.getPaymentStatus);

router.post('/webhook', controller.handleStripeWebhook);

router.post(
  '/test-success',
  checkAuth(Role.USER),
  controller.testPaymentSuccess
);

export default router;
