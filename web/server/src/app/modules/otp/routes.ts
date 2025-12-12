import { Router } from 'express';
import { validateRequest } from '@/app/middlewares';
import * as controller from './controller';
import * as validator from './validation';

const router = Router();

router.post(
  '/generate',
  validateRequest(validator.generateOtp),
  controller.generateOtp
);

router.post(
  '/verify',
  validateRequest(validator.verifyOtp),
  controller.verifyOtp
);

export default router;
