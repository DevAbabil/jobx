'use client';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { userApi } from '@/redux';

const withPreventAccessInAuth = (Component: ComponentType) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading } = userApi.useMyProfileQuery();

    return !isLoading && data?.data.email ? router.back() : <Component />;
  };
};

export default withPreventAccessInAuth;
