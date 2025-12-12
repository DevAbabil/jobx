import type { IResponse, IUser } from '@/types';
import baseApi from '../_baseApi';

export default baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signin: builder.mutation<
      IResponse<IUser>,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['USER'],
    }),
    signup: builder.mutation<
      IResponse<IUser>,
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<
      IResponse<{ message: string; email: string }>,
      { email: string }
    >({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      IResponse<{ message: string }>,
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      IResponse<{ message: string }>,
      { email: string; otp: string; password: string; confirmPassword: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<
      IResponse<{ message: string }>,
      { token: string }
    >({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmailOtp: builder.mutation<
      IResponse<{ message: string }>,
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: '/auth/verify-email-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<
      IResponse<{ message: string; email: string }>,
      { email: string; type: 'FORGOT_PASSWORD' | 'EMAIL_VERIFICATION' }
    >({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    signout: builder.mutation<IResponse<null>, void>({
      query: () => ({ url: '/auth/signout', method: 'DELETE' }),
      invalidatesTags: ['USER'],
    }),
  }),
});
