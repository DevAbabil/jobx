'use client';

import { useState } from 'react';
import { PasswordChangeForm, ProfileUpdateForm } from '@/components/admin';
import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSection,
  InfoCard,
  StatItem,
} from '@/components/dashboard';
import { ProBadge } from '@/components/payment';
import { withAuth } from '@/hoc';
import { paymentApi, userApi } from '@/redux';
import { extractError } from '@/utils';

const ProSubscriptionCard = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const { data: paymentStatus, isLoading: paymentLoading } =
    paymentApi.useGetPaymentStatusQuery();
  const { data: userProfile } = userApi.useMyProfileQuery();
  const [createPaymentIntent, { isLoading }] =
    paymentApi.useCreatePaymentIntentMutation();

  const user = userProfile?.data;
  const isUserPro = user?.isPro || paymentStatus?.data?.isPro;
  const hasPendingPayment =
    paymentStatus?.data?.hasPayment &&
    paymentStatus?.data?.paymentStatus === 'PENDING';

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    if (value && !validatePhone(value)) {
      setPhoneError('Please enter a valid Bangladeshi phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleSubscribePro = async () => {
    if (!phone) {
      setPhoneError('Phone number is required');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid Bangladeshi phone number');
      return;
    }

    try {
      const result = await createPaymentIntent({ phone }).unwrap();

      if (result.success && result.data?.GatewayPageURL) {
        // Redirect to payment gateway
        window.location.href = result.data.GatewayPageURL;
      } else {
        alert(result.message || 'Failed to create payment intent');
      }
    } catch (error: unknown) {
      console.error('Payment error:', error);
      alert(extractError(error) || 'Something went wrong. Please try again.');
    }
  };

  // If user is already pro, show success state
  if (isUserPro) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border border-emerald-200 shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span className="text-lg">👑</span>
            PRO MEMBER
          </div>
          <h3 className="text-xl font-bold text-gray-800">You're Pro!</h3>
          <p className="text-gray-600">
            You have lifetime access to all premium features.
          </p>
          <div className="bg-white/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-medium">
              <span className="text-emerald-600">✓</span>
              All Pro features unlocked
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-medium">
              <span className="text-emerald-600">✓</span>
              Lifetime access
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user has pending payment, show pending state
  if (hasPendingPayment) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-6 border border-amber-200 shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            PAYMENT PENDING
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Payment Processing
          </h3>
          <p className="text-gray-600">
            Your payment is being processed. You'll get Pro access once
            confirmed.
          </p>
          <div className="bg-white/70 rounded-lg p-4">
            <div className="text-amber-700 font-medium">
              Transaction ID: {paymentStatus?.data?.transactionId || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200 shadow-lg">
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            PRO FEATURES
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Jobx Pro</h3>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
            ৳500
          </div>
          <div className="text-sm text-gray-600 bg-white/60 rounded-full px-3 py-1 inline-block">
            One-time payment • Lifetime access
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/70 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-medium">
              Advanced job search filters
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-medium">
              Priority application processing
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-medium">
              Unlimited job applications
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-medium">Premium support</span>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {phoneError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubscribePro}
            disabled={
              isLoading ||
              !phone ||
              !!phoneError ||
              paymentLoading ||
              isUserPro ||
              hasPendingPayment
            }
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : paymentLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              'Subscribe to Pro'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserPage = () => {
  const { data: user } = userApi.useMyProfileQuery();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="My Dashboard"
        userName={user?.data?.name}
        description="Manage your account settings and personal preferences"
        variant="user"
        rightContent={<ProBadge />}
      />

      <DashboardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <DashboardSection
            title="Profile Settings"
            description="Update your personal information and profile picture"
          >
            <ProfileUpdateForm user={user?.data} />
          </DashboardSection>

          <DashboardSection
            title="Security Settings"
            description="Change your password to keep your account secure"
          >
            <PasswordChangeForm />
          </DashboardSection>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <InfoCard title="Account Information">
            <div className="space-y-4">
              <StatItem
                label="Email Address"
                value={user?.data?.email || 'N/A'}
              />
              <StatItem
                label="Account Status"
                value={
                  user?.data?.isVerified ? '✅ Verified' : '❌ Not Verified'
                }
                valueColor={
                  user?.data?.isVerified ? 'text-green-600' : 'text-red-600'
                }
              />
              <StatItem
                label="Subscription"
                value={user?.data?.isPro ? '👑 Pro Member' : '📦 Free Plan'}
                valueColor={
                  user?.data?.isPro ? 'text-yellow-600' : 'text-gray-600'
                }
              />
              <StatItem
                label="Member Since"
                value={
                  user?.data?.createdAt
                    ? new Date(user.data.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                        }
                      )
                    : 'N/A'
                }
              />
            </div>
          </InfoCard>

          <ProSubscriptionCard />
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default withAuth(UserPage);
