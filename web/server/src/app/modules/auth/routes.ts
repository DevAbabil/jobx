import { Router } from 'express';
import { validateRequest } from '@/app/middlewares';
import * as controller from './controller';
import * as validator from './validation';

const router = Router();

router.post(
  '/signin',
  validateRequest(validator.signInUser),
  controller.signInUser
);

router.post(
  '/signup',
  validateRequest(validator.signUpUser),
  controller.signUpUser
);

router.post(
  '/forgot-password',
  validateRequest(validator.forgotPassword),
  controller.forgotPassword
);

router.post(
  '/verify-otp',
  validateRequest(validator.verifyOtp),
  controller.verifyOtp
);

router.post(
  '/reset-password',
  validateRequest(validator.resetPassword),
  controller.resetPassword
);

router.post(
  '/verify-email',
  validateRequest(validator.verifyEmail),
  controller.verifyEmail
);

router.post(
  '/verify-email-otp',
  validateRequest(validator.verifyEmailOtp),
  controller.verifyEmailOtp
);

router.post(
  '/resend-otp',
  validateRequest(validator.resendOtp),
  controller.resendOtp
);

router.delete('/signout', controller.signOutUser);

export default router;
