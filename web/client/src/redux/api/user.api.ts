import type { IResponse, IUser } from '@/types';
import baseApi from '../_baseApi';

const userApi = baseApi.injectEndpoints({
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
    updateProfile: builder.mutation<
      IResponse<IUser>,
      { name?: string; picture?: string }
    >({
      query: (body) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['USER'],
    }),
    changePassword: builder.mutation<
      IResponse<{ message: string }>,
      {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: '/user/change-password',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useMyProfileQuery,
  useUpdatePictureMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi;

export default userApi;
