'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { userApi } from '@/redux';
import { Role } from '@/types';

const DashboardPage = () => {
  const router = useRouter();
  const { data: user, isLoading } = userApi.useMyProfileQuery();

  useEffect(() => {
    if (!isLoading && user?.data) {
      const isAdmin =
        user.data.role === Role.ADMIN || user.data.role === Role.SUPPER_ADMIN;

      if (isAdmin) {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    }

    if (!isLoading && !user?.data) router.push('/login');
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default DashboardPage;
