'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { AuthCard, LoadingSpinner } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { withPreventAccessInAuth } from '@/hoc';

const VerifyContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('Invalid verification link');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Verifying email with token:', token);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSuccess(true);
      } catch (error) {
        console.error('Verification error:', error);
        setError('Verification failed. The link may be expired or invalid.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  const resendVerification = async () => {
    setIsLoading(true);
    try {
      console.log('Resending verification email');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Resend verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AuthCard
        title="Verifying..."
        description="Please wait while we verify your email address"
      >
        <LoadingSpinner />
      </AuthCard>
    );
  }

  if (isSuccess) {
    return (
      <AuthCard
        title="Email verified!"
        description="Your email address has been successfully verified"
      >
        <div className="text-center space-y-4">
          <div className="text-green-600 dark:text-green-400 text-4xl">✓</div>
          <p className="text-sm text-muted-foreground">
            You can now sign in to your account
          </p>
          <Link href="/login">
            <Button className="w-full">Continue to sign in</Button>
          </Link>
        </div>
      </AuthCard>
    );
  }

  if (error) {
    return (
      <AuthCard title="Verification failed" description={error}>
        <div className="text-center space-y-4">
          <div className="text-destructive text-4xl">✗</div>
          <div className="space-y-2">
            <Button onClick={resendVerification} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Resend verification email'}
            </Button>
            <div>
              <Link
                href="/login"
                className="text-sm text-primary hover:text-primary/80"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </AuthCard>
    );
  }

  return null;
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

export default withPreventAccessInAuth(VerifyPage);
