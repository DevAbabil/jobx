'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AuthCard, AuthFormField, LoadingSpinner } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { userApi } from '@/redux';
import authApi from '@/redux/api/auth.api';
import { extractError } from '@/utils';

const verifyOtpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z
    .string()
    .min(6, { message: 'OTP must be 6 digits' })
    .max(6, { message: 'OTP must be 6 digits' })
    .regex(/^\d+$/, { message: 'OTP must contain only numbers' }),
});

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

const VerifyContent = () => {
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = userApi.useMyProfileQuery();

  const [verifyEmailOtp, { isLoading: isVerifying }] =
    authApi.useVerifyEmailOtpMutation();
  const [resendOtp, { isLoading: isResending }] =
    authApi.useResendOtpMutation();

  const userEmail = userData?.data?.email;

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: userEmail,
      otp: '',
    },
  });

  useEffect(() => {
    if (userEmail) {
      form.setValue('email', userEmail);
    }
  }, [userEmail, form]);

  useEffect(() => {
    if (!isUserLoading && userError) {
      toast.error('Please log in to verify your email');
      router.push('/login');
    }
  }, [isUserLoading, userError, router]);

  useEffect(() => {
    if (userData?.data?.isVerified) {
      toast.success('Your email is already verified');
      router.push('/dashboard');
    }
  }, [userData?.data?.isVerified, router]);

  if (isUserLoading) {
    return (
      <AuthCard title="Loading..." description="Checking your account status">
        <LoadingSpinner />
      </AuthCard>
    );
  }

  const sendVerificationOtp = async () => {
    const email = form.getValues('email');
    if (!email) {
      form.setError('email', { message: 'Please enter your email first' });
      return;
    }

    try {
      const response = await resendOtp({
        email,
        type: 'EMAIL_VERIFICATION',
      }).unwrap();
      toast.success(response.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(extractError(error) || 'Failed to send verification OTP.');
    }
  };

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      const response = await verifyEmailOtp(data).unwrap();
      toast.success(response.message);
      setIsSuccess(true);
      router.push('/dashboard');
    } catch (error) {
      toast.error(
        extractError(error) || 'OTP verification failed. Please try again.'
      );
    }
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Email verified!"
        description="Your email address has been successfully verified"
      >
        <div className="text-center space-y-4">
          <div className="text-green-600 dark:text-green-400 text-4xl">✓</div>
          <p className="text-sm text-muted-foreground">
            {userData?.data?.email
              ? 'Your account is now fully verified'
              : 'You can now sign in to your account'}
          </p>
          <Link href={userData?.data?.email ? '/dashboard' : '/login'}>
            <Button className="w-full">
              {userData?.data?.email
                ? 'Go to Dashboard'
                : 'Continue to sign in'}
            </Button>
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verify your email"
      description={
        userData?.data?.email
          ? `Verify your email address: ${userData.data.email}`
          : 'Enter your email and the OTP sent to verify your account'
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <AuthFormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              {userData?.data?.email && (
                <p className="text-xs text-muted-foreground mt-1">
                  Using email from your account
                </p>
              )}
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={sendVerificationOtp}
                disabled={isResending || !form.watch('email')}
                className="whitespace-nowrap"
              >
                {isResending
                  ? 'Sending...'
                  : otpSent
                    ? 'Resend OTP'
                    : 'Send OTP'}
              </Button>
            </div>
          </div>

          {otpSent && (
            <div className="text-sm text-green-600 dark:text-green-400">
              ✓ Verification OTP sent to your email address
            </div>
          )}

          <AuthFormField
            control={form.control}
            name="otp"
            label="Verification Code"
            placeholder="Enter 6-digit OTP"
            type="text"
          />

          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify Email'}
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

const VerifyPage = () => {
  return (
    <Suspense
      fallback={
        <AuthCard title="Loading..." description="">
          <LoadingSpinner />
        </AuthCard>
      }
    >
      <VerifyContent />
    </Suspense>
  );
};

export default VerifyPage;
