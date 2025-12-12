import crypto from 'node:crypto';
import { AppError } from '@/app/errors';
import { ENV } from '@/config';
import { HTTP_CODE, StripePayment } from '@/shared';
import type { IUser } from '../user/interface';
import { PyamentStatus } from './interface';
import { Payment } from './model';

const stripe = new StripePayment(ENV.STRIPE_SECRET_KEY);

export const createIntend = async (phone: string, user: Partial<IUser>) => {
  // Check if user already has a successful payment
  const existingPayment = await Payment.findOne({ user: user._id });

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
          user: user._id,
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
  const payment = await Payment.findOne({ user: userId });

  if (!payment) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'Payment not found for this user');
  }

  // Update payment status
  payment.status = status;
  await payment.save();

  // If payment is successful, update user's pro status
  if (status === PyamentStatus.SUCCESS) {
    const { User } = await import('../user/model');
    await User.findByIdAndUpdate(payment.user, { isPro: true });
  }

  return payment;
};

export const getUserPaymentStatus = async (userId: string) => {
  const payment = await Payment.findOne({ user: userId });
  const { User } = await import('../user/model');
  const user = await User.findById(userId);

  return {
    hasPayment: !!payment,
    isPaid: payment?.status === PyamentStatus.SUCCESS,
    isPro: user?.isPro || false,
    paymentStatus: payment?.status || null,
    paymentAmount: payment?.amount || null,
    transactionId: payment?.txrn_id || null,
  };
};
