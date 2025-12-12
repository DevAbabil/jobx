import { Crown } from 'lucide-react';
import type React from 'react';
import userApi from '@/redux/api/user.api';

interface ProBadgeProps {
  className?: string;
}

export const ProBadge: React.FC<ProBadgeProps> = ({ className }) => {
  const { data: userProfile } = userApi.useMyProfileQuery();
  const user = userProfile?.data;

  if (!user?.isPro) return null;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full ${className}`}
    >
      <Crown className="w-3 h-3" />
      Pro
    </div>
  );
};
