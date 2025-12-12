import type { ReactNode } from 'react';

interface DashboardSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const DashboardSection = ({
  title,
  description,
  children,
  className = '',
}: DashboardSectionProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center lg:text-left">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};
