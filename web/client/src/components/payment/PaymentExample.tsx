import type React from 'react';
import { toast } from 'sonner';
import { useCreatePaymentIntentMutation } from '@/redux/api/payment.api';
import userApi from '@/redux/api/user.api';
import { extractError } from '@/utils';
import { PaymentButton, ProBadge } from './index';

export const PaymentExample: React.FC = () => {
  const { data: userProfile } = userApi.useMyProfileQuery();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const user = userProfile?.data;

  const handlePaymentClick = async () => {
    try {
      // You would typically get the phone number from a form
      const phone = prompt('Enter your phone number:');
      if (!phone) return;

      const result = await createPaymentIntent({ phone }).unwrap();

      // Redirect to payment gateway
      if (result.data?.GatewayPageURL) {
        window.open(result.data.GatewayPageURL, '_blank');
      }
    } catch (error) {
      toast.error(extractError(error) || 'Failed to create payment intent');
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
        <ProBadge />
      </div>

      <PaymentButton onPaymentClick={handlePaymentClick} />

      {user?.isPro && (
        <p className="text-sm text-muted-foreground">
          🎉 You have access to all Pro features!
        </p>
      )}
    </div>
  );
};
