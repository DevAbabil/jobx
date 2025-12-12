'use client';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { userApi } from '@/redux';
import type { Role } from '@/types';

const withAuth = (Component: ComponentType, requiredRole?: Role[]) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading, error } = userApi.useMyProfileQuery();

    useEffect(() => {
      if (error || (!isLoading && !data?.data?.email))
        return router.push('/login');

      if (!isLoading && data?.data && !data.data.isVerified)
        return router.push(`/verify?email=${data.data.email}`);

      if (
        requiredRole &&
        !isLoading &&
        !data?.data &&
        !requiredRole.includes(data.data.role)
      )
        return router.push('/unauthorized');
    }, [error, isLoading, data, requiredRole, router]);

    if (isLoading) return null;

    return data?.data?.email ? <Component /> : null;
  };
};

export default withAuth;
