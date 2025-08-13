import { cn } from '@/lib/cn';

interface WinStreakBadgeProps {
  streak: number;
  className?: string;
}

/**
 * Component to display win streak with fire icon
 */
export function WinStreakBadge({ streak, className }: WinStreakBadgeProps) {
  if (streak === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white shadow-md',
        className,
      )}
    >
      <span>🔥</span>
      <span>{streak}</span>
    </div>
  );
}