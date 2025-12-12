import type React from 'react';

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
  const gradientClass =
    variant === 'admin'
      ? 'bg-gradient-to-r from-orange-500/10 via-red-500/5 to-background'
      : 'bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-background';

  return (
    <div className={`${gradientClass} border-b`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center relative">
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
