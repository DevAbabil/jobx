import type { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

export const InfoCard = ({
  title,
  children,
  className = '',
  variant = 'default',
}: InfoCardProps) => {
  const baseClasses = 'p-6 sm:p-8 rounded-lg border';
  const variantClasses =
    variant === 'gradient'
      ? 'bg-gradient-to-br from-primary/5 to-primary/10'
      : 'bg-muted/30';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-center">{title}</h3>
      {children}
    </div>
  );
};
