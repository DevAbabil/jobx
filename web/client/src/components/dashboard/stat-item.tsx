interface StatItemProps {
  label: string;
  value: string | number;
  valueColor?: string;
  size?: 'sm' | 'lg';
}

export const StatItem = ({
  label,
  value,
  valueColor = 'text-foreground',
  size = 'sm',
}: StatItemProps) => {
  const valueClasses =
    size === 'lg'
      ? `text-2xl font-bold ${valueColor}`
      : `font-medium ${valueColor}`;

  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground text-sm sm:text-base">
        {label}
      </span>
      <span className={valueClasses}>{value}</span>
    </div>
  );
};
