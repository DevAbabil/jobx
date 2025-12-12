'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthCard, AuthFormField } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { withPreventAccessInAuth } from '@/hoc';

const resetPasswordSchema = z
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

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const sendOtp = async () => {
    const email = form.getValues('email');
    if (!email) {
      form.setError('email', { message: 'Please enter your email first' });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending OTP to:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
    } catch (error) {
      console.error('Send OTP error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      console.log('Reset password data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Password updated!"
        description="Your password has been successfully updated"
      >
        <div className="text-center space-y-4">
          <div className="text-green-600 dark:text-green-400 text-4xl">✓</div>
          <p className="text-sm text-muted-foreground">
            You can now sign in with your new password
          </p>
          <Link href="/login">
            <Button className="w-full">Continue to sign in</Button>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Reset password"
      description="Enter your email, OTP, and new password to reset your password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <AuthFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={sendOtp}
                disabled={isLoading || !form.watch('email')}
                className="whitespace-nowrap"
              >
                {isLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
              </Button>
            </div>
          </div>

          {otpSent && (
            <div className="text-sm text-green-600 dark:text-green-400">
              ✓ OTP sent to your email address
            </div>
          )}

          <AuthFormField
            control={form.control}
            name="otp"
            label="Verification Code"
            placeholder="Enter 6-digit OTP"
            type="text"
          />

          <AuthFormField
            control={form.control}
            name="password"
            label="New Password"
            placeholder="Enter new password"
            type="password"
          />

          <AuthFormField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating password...' : 'Update Password'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-primary hover:text-primary/80"
        >
          Back to sign in
        </Link>
      </div>
    </AuthCard>
  );
};

export default withPreventAccessInAuth(ForgotPasswordPage);
