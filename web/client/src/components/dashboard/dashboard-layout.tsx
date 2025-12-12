import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <div className="min-h-screen bg-background">{children}</div>;
};

interface DashboardContentProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl';
}

export const DashboardContent = ({
  children,
  maxWidth = '6xl',
}: DashboardContentProps) => {
  const maxWidthClass = `max-w-${maxWidth}`;

  return (
    <div
      className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12`}
    >
      {children}
    </div>
  );
};
