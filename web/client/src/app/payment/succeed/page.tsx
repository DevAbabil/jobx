'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { paymentApi } from '@/redux';
import { extractError } from '@/utils';

const PaymentSuccessContent = () => {
  const [message, setMessage] = useState('Verifying your payment...');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verifyPaymentSession, { isLoading: isVerifying }] =
    paymentApi.useVerifyPaymentSessionMutation();

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setMessage('Invalid payment session. Please contact support.');
        return;
      }

      try {
        const result = await verifyPaymentSession({
          sessionId,
        }).unwrap();

        if (result.success) {
          setMessage(
            'Payment verified successfully! You now have access to Pro features.'
          );
          setTimeout(() => {
            router.push('/dashboard/user');
          }, 3000);
        } else {
          setMessage(result.message || 'Failed to verify payment');
        }
      } catch (error: unknown) {
        setMessage(
          extractError(error) ||
            'Payment verification failed. Please contact support.'
        );
      }
    };

    handlePaymentSuccess();
  }, [verifyPaymentSession, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          {isVerifying ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          ) : (
            <div className="text-green-500 text-6xl mb-4">✓</div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isVerifying ? 'Verifying Payment' : 'Payment Successful!'}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {!isVerifying && (
          <button
            type="button"
            onClick={() => router.push('/dashboard/user')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Loading...
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
