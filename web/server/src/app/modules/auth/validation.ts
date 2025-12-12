import { z } from 'zod';

export const signInUser = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signUpUser = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const forgotPassword = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export const verifyOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});

export const resetPassword = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    otp: z
      .string()
      .min(6, { message: 'OTP must be 6 digits' })
      .max(6, { message: 'OTP must be 6 digits' })
      .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const verifyEmail = z.object({
  token: z.string().min(1, { message: 'Verification token is required' }),
});

export const verifyEmailOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});

export const resendOtp = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  type: z.enum(['FORGOT_PASSWORD', 'EMAIL_VERIFICATION']),
});
