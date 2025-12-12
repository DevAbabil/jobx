'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { paymentApi } from '@/redux';

const PaymentSuccessPage = () => {
  const [message, setMessage] = useState('Processing your payment...');
  const router = useRouter();

  const [updatePaymentStatus, { isLoading: isUpdating }] =
    paymentApi.useUpdatePaymentStatusMutation();

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const result = await updatePaymentStatus({
          status: 'SUCCESS',
        }).unwrap();

        if (result.success) {
          setMessage(
            'Payment successful! You now have access to Pro features.'
          );
          setTimeout(() => {
            router.push('/dashboard/user');
          }, 3000);
        } else {
          setMessage(result.message || 'Failed to update payment status');
        }
      } catch (error: any) {
        console.error('Error updating payment status:', error);
        setMessage(
          error?.data?.message ||
            'Something went wrong. Please contact support.'
        );
      }
    };

    handlePaymentSuccess();
  }, [updatePaymentStatus, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          {isUpdating ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          ) : (
            <div className="text-green-500 text-6xl mb-4">✓</div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isUpdating ? 'Processing Payment' : 'Payment Successful!'}
        </h1>

        <p className="text-gray-600 mb-6">{message}</p>

        {!isUpdating && (
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

export default PaymentSuccessPage;
