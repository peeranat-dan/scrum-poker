import { cn } from '@/lib/cn';

interface WinStreakBadgeProps {
  streak: number;
  className?: string;
}

export function WinStreakBadge({ streak, className }: WinStreakBadgeProps) {
  if (streak === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg',
        className,
      )}
    >
      <span className='mr-0.5'>🔥</span>
      <span>{streak}</span>
    </div>
  );
}