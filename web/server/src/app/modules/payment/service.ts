import crypto from 'node:crypto';
import { AppError } from '@/app/errors';
import { ENV } from '@/config';
import { HTTP_CODE, StripePayment } from '@/shared';
import { PyamentStatus } from './interface';
import { Payment } from './model';

const stripe = new StripePayment(ENV.STRIPE_SECRET_KEY);

export const createIntend = async (phone: string, user: any) => {
  // Use userId from JWT payload
  const userId = user.userId || user._id;
  console.log('createIntend called with user:', { userId, user });

  // Check if user already has a successful payment
  const existingPayment = await Payment.findOne({ user: userId });

  if (existingPayment?.status === PyamentStatus.SUCCESS) {
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      'You have already subscribed to Pro features'
    );
  }

  const txrn_id = crypto.randomBytes(12).toString('hex');

  try {
    const response = await stripe.createCheckoutSession({
      amount: ENV.JOBX_PRO_PRICE,
      currency: 'USD',
      txrn_id,
      customer_email: user.email || '',
      customer_name: user.name || '',
      customer_phone: phone,
    });

    if (response.status === 'SUCCESS' && response.checkout_url) {
      // Create or update payment record
      if (existingPayment) {
        existingPayment.status = PyamentStatus.PENDING;
        existingPayment.txrn_id = txrn_id;
        await existingPayment.save();
      } else {
        await Payment.create({
          amount: ENV.JOBX_PRO_PRICE,
          status: PyamentStatus.PENDING,
          txrn_id,
          user: userId,
        });
      }

      return {
        GatewayPageURL: response.checkout_url,
        session_id: response.session_id,
      };
    } else {
      throw new AppError(
        HTTP_CODE.BAD_REQUEST,
        'Failed to create Stripe checkout session'
      );
    }
  } catch (error) {
    console.error('Stripe payment error:', error);
    throw new AppError(
      HTTP_CODE.INTERNAL_SERVER_ERROR,
      'Payment processing failed'
    );
  }
};

export const updatePaymentStatus = async (
  userId: string,
  status: PyamentStatus
) => {
  console.log('updatePaymentStatus called with:', { userId, status });

  const payment = await Payment.findOne({ user: userId });
  console.log('Found payment:', payment);

  if (!payment) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'Payment not found for this user');
  }

  // Update payment status
  payment.status = status;
  await payment.save();
  console.log('Payment status updated to:', status);

  // If payment is successful, update user's pro status
  if (status === PyamentStatus.SUCCESS) {
    const { User } = await import('../user/model');
    const updatedUser = await User.findByIdAndUpdate(
      payment.user,
      { isPro: true },
      { new: true }
    );
    console.log('User updated to pro:', updatedUser);
  }

  return payment;
};

export const verifyAndUpdatePaymentStatus = async (
  userId: string,
  sessionId: string
) => {
  console.log('verifyAndUpdatePaymentStatus called with:', {
    userId,
    sessionId,
  });

  // Verify the Stripe session
  const sessionVerification = await stripe.verifyCheckoutSession(sessionId);
  console.log('Session verification result:', sessionVerification);

  if (sessionVerification.payment_status !== 'paid') {
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      'Payment was not completed successfully'
    );
  }

  // Find the payment record using transaction ID from metadata
  const txrn_id = sessionVerification.metadata?.txrn_id;
  if (!txrn_id) {
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      'Transaction ID not found in session metadata'
    );
  }

  const payment = await Payment.findOne({
    user: userId,
    txrn_id: txrn_id,
  });

  if (!payment) {
    throw new AppError(
      HTTP_CODE.NOT_FOUND,
      'Payment record not found for this session'
    );
  }

  // Prevent duplicate processing
  if (payment.status === PyamentStatus.SUCCESS) {
    console.log('Payment already processed successfully');
    return payment;
  }

  // Update payment status to SUCCESS
  payment.status = PyamentStatus.SUCCESS;
  await payment.save();
  console.log('Payment status updated to SUCCESS');

  // Update user's pro status
  const { User } = await import('../user/model');
  const updatedUser = await User.findByIdAndUpdate(
    payment.user,
    { isPro: true },
    { new: true }
  );
  console.log('User updated to pro:', updatedUser);

  return payment;
};

export const handleWebhookPaymentSuccess = async (txrn_id: string) => {
  console.log('handleWebhookPaymentSuccess called with txrn_id:', txrn_id);

  const payment = await Payment.findOne({ txrn_id });

  if (!payment) {
    console.log('Payment not found for transaction ID:', txrn_id);
    return;
  }

  // Prevent duplicate processing
  if (payment.status === PyamentStatus.SUCCESS) {
    console.log('Payment already processed successfully');
    return payment;
  }

  // Update payment status to SUCCESS
  payment.status = PyamentStatus.SUCCESS;
  await payment.save();
  console.log('Payment status updated to SUCCESS via webhook');

  // Update user's pro status
  const { User } = await import('../user/model');
  const updatedUser = await User.findByIdAndUpdate(
    payment.user,
    { isPro: true },
    { new: true }
  );
  console.log('User updated to pro via webhook:', updatedUser);

  return payment;
};

export const getUserPaymentStatus = async (userId: string) => {
  console.log('getUserPaymentStatus called with userId:', userId);

  const payment = await Payment.findOne({ user: userId });
  console.log('Found payment:', payment);

  const { User } = await import('../user/model');
  const user = await User.findById(userId);
  console.log('Found user:', { _id: user?._id, isPro: user?.isPro });

  const result = {
    hasPayment: !!payment,
    isPaid: payment?.status === PyamentStatus.SUCCESS,
    isPro: user?.isPro || false,
    paymentStatus: payment?.status || null,
    paymentAmount: payment?.amount || null,
    transactionId: payment?.txrn_id || null,
  };

  console.log('Returning payment status:', result);
  return result;
};
