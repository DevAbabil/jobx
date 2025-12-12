import { Crown } from 'lucide-react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import paymentApi from '@/redux/api/payment.api';
import userApi from '@/redux/api/user.api';

interface PaymentButtonProps {
  onPaymentClick?: () => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  onPaymentClick,
}) => {
  const { data: paymentStatus, isLoading: paymentLoading } =
    paymentApi.useGetPaymentStatusQuery();
  const { data: userProfile, isLoading: userLoading } =
    userApi.useMyProfileQuery();

  const isLoading = paymentLoading || userLoading;
  const user = userProfile?.data;

  // If user is already pro, show badge instead of button
  if (user?.isPro || paymentStatus?.data?.isPro) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium rounded-full">
        <Crown className="w-4 h-4" />
        Pro Member
      </div>
    );
  }

  // If user has pending payment, show different state
  if (
    paymentStatus?.data?.hasPayment &&
    paymentStatus?.data?.paymentStatus === 'PENDING'
  ) {
    return (
      <Button disabled variant="outline">
        Payment Pending...
      </Button>
    );
  }

  // Show upgrade button for non-pro users
  return (
    <Button
      onClick={onPaymentClick}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Crown className="w-4 h-4" />
      Upgrade to Pro
    </Button>
  );
};
