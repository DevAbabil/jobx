import { Router } from 'express';
import { checkAuth, validateRequest } from '@/app/middlewares';
import * as controller from './controller';
import { Role } from './interface';
import * as validator from './validation';

const router = Router();

router.get('/me', checkAuth(...Object.values(Role)), controller.me);
router.put(
  '/picture',
  checkAuth(...Object.values(Role)),
  validateRequest(validator.zUpdatePictureSchema),
  controller.updatePicture
);
router.put(
  '/profile',
  checkAuth(...Object.values(Role)),
  validateRequest(validator.zUpdateProfileSchema),
  controller.updateProfile
);
router.put(
  '/change-password',
  checkAuth(...Object.values(Role)),
  validateRequest(validator.zChangePasswordSchema),
  controller.changePassword
);

export default router;
