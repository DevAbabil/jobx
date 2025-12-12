'use client';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { userApi } from '@/redux';

const withPreventAccessInAuth = (Component: ComponentType) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading, error } = userApi.useMyProfileQuery();

    useEffect(() => {
      if (!isLoading && data?.data?.email) router.push('/dashboard');
    }, [data, isLoading, router]);

    if (error || (!isLoading && !data?.data?.email)) return <Component />;

    if (isLoading) return null;

    return <Component />;
  };
};

export default withPreventAccessInAuth;
