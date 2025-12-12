'use client';
import { useRouter } from 'next/navigation';
import { type ComponentType, useEffect, useState } from 'react';
import { userApi } from '@/redux';
import type { Role } from '@/types';

const withAuth = (Component: ComponentType, requiredRole?: Role[]) => {
  return function AuthWrapper() {
    const router = useRouter();
    const { data, isLoading, error } = userApi.useMyProfileQuery();
    const [checked, setChecked] = useState(false);

    const user = data?.data;

    useEffect(() => {
      if (isLoading) return;

      // Not logged in
      if (error || !user?.email) {
        router.push('/login');
        return;
      }

      // Not verified
      if (!user.isVerified) {
        router.push(`/verify?email=${user.email}`);
        return;
      }

      // Role mismatch
      if (requiredRole && !requiredRole.includes(user.role)) {
        router.push('/unauthorized');
        return;
      }

      // If passed all checks
      setChecked(true);
    }, [isLoading, error, user, requiredRole, router]);

    // waiting for RTK Query OR redirect
    if (!checked) return null;

    return <Component />;
  };
};

export default withAuth;
