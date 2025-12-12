import type { IResponse, IUser } from '@/types';
import baseApi from '../_baseApi';

export default baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    myProfile: builder.query<IResponse<IUser>, void>({
      query: () => ({ url: '/user/me', method: 'GET' }),
      providesTags: ['USER'],
    }),
    updatePicture: builder.mutation<IResponse<IUser>, { pictureId: string }>({
      query: (body) => ({
        url: '/user/picture',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});
