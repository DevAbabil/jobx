import { z } from 'zod';
import { OtpType } from './interface';

export const generateOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  type: z.nativeEnum(OtpType, { message: 'Invalid OTP type' }),
});

export const verifyOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
  type: z.nativeEnum(OtpType, { message: 'Invalid OTP type' }),
});

export const verifyEmailOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});
