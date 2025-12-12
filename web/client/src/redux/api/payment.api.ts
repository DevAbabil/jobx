import type { IResponse } from '@/types';
import baseApi from '../_baseApi';

interface PaymentIntentRequest {
  phone: string;
}

interface PaymentIntentResponse {
  GatewayPageURL: string;
}

interface PaymentStatusUpdateRequest {
  status: 'SUCCESS' | 'FILED' | 'PENDING';
}

interface PaymentStatusUpdateResponse {
  txrn_id: string;
  amout: number;
  status: string;
  user: string;
}

export default baseApi.injectEndpoints({
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
  }),
});
