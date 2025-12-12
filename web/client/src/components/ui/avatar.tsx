import { useState } from 'react';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-2xl',
};

export const Avatar = ({
  src,
  name = '',
  size = 'md',
  className = '',
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const initials =
    name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  const sizeClass = sizeClasses[size];

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`${sizeClass} rounded-full object-cover border-2 border-border ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold ${className}`}
    >
      {initials}
    </div>
  );
};
