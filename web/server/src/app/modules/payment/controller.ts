import { catchAsync, HTTP_CODE, sendResponse } from '@/shared';
import { PyamentStatus } from './interface';
import * as service from './service';

export const createInted = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment intend created',
    data: await service.createIntend(req.body.phone, req.user),
  });
});

export const updatePaymentStatus = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment status updated',
    data: await service.updatePaymentStatus(req.user.userId, req.body.status),
  });
});

export const getPaymentStatus = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment status retrieved',
    data: await service.getUserPaymentStatus(req.user.userId),
  });
});

export const verifyPaymentSession = catchAsync(async (req, res) => {
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment verified and status updated',
    data: await service.verifyAndUpdatePaymentStatus(
      req.user.userId,
      req.body.sessionId
    ),
  });
});

// Test endpoint to manually set payment to success
export const handleStripeWebhook = catchAsync(async (req, res) => {
  console.log('Stripe webhook received:', req.body);

  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      console.log('Checkout session completed:', session);

      // Extract transaction ID from metadata
      const txrn_id = session.metadata?.txrn_id;
      if (txrn_id) {
        await service.handleWebhookPaymentSuccess(txrn_id);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export const testPaymentSuccess = catchAsync(async (req, res) => {
  console.log('Test payment success called for user:', req.user);
  const result = await service.updatePaymentStatus(
    req.user.userId,
    PyamentStatus.SUCCESS
  );
  sendResponse(res, {
    status: HTTP_CODE.OK,
    success: true,
    message: 'payment status set to success for testing',
    data: result,
  });
});
