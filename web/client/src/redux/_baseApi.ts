import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ENV } from '@/config';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.BASE_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
  tagTypes: ['USER'],
});

export default baseApi;
