import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  fullscreen?: boolean;
}

export default function Loading({ fullscreen }: Readonly<LoadingProps>) {
  return (
    <div className={cn('flex items-center justify-center', fullscreen ? 'h-svh' : 'h-full')}>
      <div className='flex flex-col items-center justify-center'>
        <Loader2 className='text-primary h-10 w-10 animate-spin' />
      </div>
    </div>
  );
}
