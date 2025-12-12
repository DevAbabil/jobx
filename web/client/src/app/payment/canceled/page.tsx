'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { paymentApi } from '@/redux';
import { extractError } from '@/utils';

const PaymentCanceledPage = () => {
  const [message, setMessage] = useState('Processing cancellation...');
  const router = useRouter();

  const [updatePaymentStatus, { isLoading: isUpdating }] =
    paymentApi.useUpdatePaymentStatusMutation();

  useEffect(() => {
    const handlePaymentCancellation = async () => {
      try {
        const result = await updatePaymentStatus({ status: 'FAILED' }).unwrap();

        if (result.success) {
          setMessage('Payment was canceled. You can try again anytime.');
        } else {
          setMessage(result.message || 'Failed to update payment status');
        }
      } catch (error: unknown) {
        console.error('Error updating payment status:', error);
        setMessage(
          extractError(error) || 'Something went wrong. Please contact support.'
        );
      }
    };

    handlePaymentCancellation();
  }, [updatePaymentStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          {isUpdating ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto"></div>
          ) : (
            <div className="text-yellow-500 text-6xl mb-4">⚠</div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isUpdating ? 'Processing...' : 'Payment Canceled'}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {!isUpdating && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/user')}
              className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCanceledPage;
