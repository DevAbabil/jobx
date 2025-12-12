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
    signout: builder.mutation<IResponse<null>, void>({
      query: () => ({ url: '/auth/signout', method: 'DELETE' }),
    }),
  }),
});
