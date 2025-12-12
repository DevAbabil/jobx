'use client';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { userApi } from '@/redux';
import type { Role } from '@/types';

const withAuth = (Component: ComponentType, requiredRole?: Role) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading } = userApi.useMyProfileQuery();

    if (!isLoading && !data?.data?.email) return router.push('/login');

    if (!isLoading && !data?.data.isVerified)
      return router.push(`/verify?email=${data?.data.email}`);

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role)
      return router.push('/unauthorized');

    return <Component />;
  };
};

export default withAuth;
