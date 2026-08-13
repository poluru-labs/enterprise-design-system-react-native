import { Icon } from '../Icon';

export type StatusTone = 'success' | 'info' | 'warning' | 'danger';

const MAP: Record<StatusTone, 'check-circle' | 'info' | 'warning' | 'x-circle'> = {
  success: 'check-circle',
  info: 'info',
  warning: 'warning',
  danger: 'x-circle',
};

export function StatusIcon({
  variant,
  size = 18,
  color,
}: {
  variant: StatusTone;
  size?: number;
  color?: string;
}) {
  const iconSize = size <= 16 ? 'sm' : size <= 20 ? 'md' : 'lg';
  return <Icon name={MAP[variant]} size={iconSize} color={color} decorative />;
}
