'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { toast } from 'sonner';
import { authApi, useAppDispatch, userApi } from '@/redux';
import { extractError } from '@/utils';
import { Button } from '../ui/button';

interface DashboardHeaderProps {
  title: string;
  userName?: string;
  description: string;
  variant?: 'admin' | 'user';
  rightContent?: React.ReactNode;
}

export const DashboardHeader = ({
  title,
  userName,
  description,
  variant = 'user',
  rightContent,
}: DashboardHeaderProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signout, { isLoading: isSigningOut }] = authApi.useSignoutMutation();

  const handleSignOut = async () => {
    try {
      await signout().unwrap();
      dispatch(userApi.util.resetApiState());
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      toast.error(extractError(error) || 'Failed to sign out');
    }
  };

  const gradientClass =
    variant === 'admin'
      ? 'bg-gradient-to-r from-orange-500/10 via-red-500/5 to-background'
      : 'bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-background';

  return (
    <div className={`${gradientClass} border-b`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center relative">
          {/* Logout button positioned absolutely in top-right */}
          <div className="absolute top-0 right-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isSigningOut ? 'Signing out...' : 'Logout'}
            </Button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>
          {userName && (
            <div className="flex items-center justify-center gap-3 mb-2">
              <p className="text-lg sm:text-xl text-muted-foreground">
                Welcome back, {userName}
              </p>
              {rightContent}
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
