import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const zUpdatePictureSchema = z.object({
  pictureId: z.string().refine((val) => isValidObjectId(val), {
    message: 'pictureId must be a valid ObjectId',
  }),
});

export const zUpdateProfileSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, 'Name must be less than 100 characters')
      .optional(),
    picture: z.string().url('Must be a valid URL').optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (name or picture) must be provided',
  });

export const zChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password don't match",
    path: ['confirmPassword'],
  });
