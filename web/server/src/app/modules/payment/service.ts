import crypto from 'node:crypto';
import { SslCommerzPayment } from 'sslcommerz';
import { AppError } from '@/app/errors';
import { ENV } from '@/config';
import { HTTP_CODE } from '@/shared';
import type { IUser } from '../user/interface';
import { PyamentStatus } from './interface';
import { Payment } from './model';

const sslcz = new SslCommerzPayment(ENV.SSLC_STORE_ID, ENV.SSLC_PASS, false);

export const createIntend = async (phone: string, user: Partial<IUser>) => {
  const payment = await Payment.findOne({ user: user._id });

  if (payment?.status === PyamentStatus.SUCCESS)
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      `You've already subscribed pro features`
    );

  const txrn_id = crypto.randomBytes(12).toString('hex');

  const paymentIntentInfo = {
    // Transaction Info
    tran_id: txrn_id,
    total_amount: ENV.JOBX_PRO_PRICE,
    currency: 'BDT',

    // Redirect URLs
    success_url: `${ENV.FRONTEND_URL}/payment/succeed`,
    fail_url: `${ENV.FRONTEND_URL}/payment/failed`,
    cancel_url: `${ENV.FRONTEND_URL}/payment/canceled`,
    ipn_url: `${ENV.BACKEND_URL}/api/payment/ipn`,

    // Customer Info
    cus_name: user.name,
    cus_email: user.email,
    cus_phone: phone,

    // Shipping Info
    shipping_method: 'NO',

    // Product Info
    product_name: 'Jobx Pro Features',
  };

  const response = await sslcz.init(paymentIntentInfo);

  if (response.status === 'SUCCESS' && response?.GatewayPageURL) {
    await Payment.create({
      amout: ENV.JOBX_PRO_PRICE,
      status: PyamentStatus.PENDING,
      txrn_id,
      user: user._id,
    });
    return {
      GatewayPageURL: response?.GatewayPageURL,
    };
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

  // If payment is successful, you might want to update user's pro status
  // This depends on your User model structure
  if (status === PyamentStatus.SUCCESS) {
    // TODO: Update user's isPro or hasLifetimeAccess field
    // const User = require('../user/model'); // Import user model
    // await User.findByIdAndUpdate(payment.user, { isPro: true });
  }

  return payment;
};
