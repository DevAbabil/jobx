import type { IResponse } from '@/types';
import baseApi from '../_baseApi';

interface PaymentIntentRequest {
  phone: string;
}

interface PaymentIntentResponse {
  GatewayPageURL: string;
}

interface PaymentStatusUpdateRequest {
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

interface PaymentSessionVerifyRequest {
  sessionId: string;
}

interface PaymentStatusUpdateResponse {
  txrn_id: string;
  amount: number;
  status: string;
  user: string;
}

interface PaymentStatusResponse {
  hasPayment: boolean;
  isPaid: boolean;
  isPro: boolean;
  paymentStatus: string | null;
  paymentAmount: number | null;
  transactionId: string | null;
}

const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      IResponse<PaymentIntentResponse>,
      PaymentIntentRequest
    >({
      query: (body) => ({
        url: '/payment/intent',
        method: 'POST',
        body,
      }),
    }),
    updatePaymentStatus: builder.mutation<
      IResponse<PaymentStatusUpdateResponse>,
      PaymentStatusUpdateRequest
    >({
      query: (body) => ({
        url: '/payment/update-status',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['USER'], // Invalidate user data since payment status affects user
    }),
    getPaymentStatus: builder.query<IResponse<PaymentStatusResponse>, void>({
      query: () => ({
        url: '/payment/status',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
    verifyPaymentSession: builder.mutation<
      IResponse<PaymentStatusUpdateResponse>,
      PaymentSessionVerifyRequest
    >({
      query: (body) => ({
        url: '/payment/verify-session',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['USER'], // Invalidate user data since payment status affects user
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useUpdatePaymentStatusMutation,
  useGetPaymentStatusQuery,
  useVerifyPaymentSessionMutation,
} = paymentApi;

export default paymentApi;
