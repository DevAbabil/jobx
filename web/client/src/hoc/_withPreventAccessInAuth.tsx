'use client';
import { useRouter } from 'next/navigation';
import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { userApi } from '@/redux';

const withPreventAccessInAuth = (Component: ComponentType) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading } = userApi.useMyProfileQuery();
    const user = data?.data;

    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (isLoading) return;

      // If user already logged in → redirect to dashboard
      if (user?.email) {
        router.replace('/dashboard'); // replace() to prevent back button issue
        return;
      }

      setChecked(true);
    }, [isLoading, user, router]);

    // Still loading OR redirecting → show nothing
    if (!checked) return null;

    // User is not logged in → show the auth page
    return <Component />;
  };
};

export default withPreventAccessInAuth;
