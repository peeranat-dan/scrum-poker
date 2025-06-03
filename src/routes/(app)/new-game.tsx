import { Card, CardContent } from '@/components/ui/card';
import SessionCreationContainer from '@/containers/session-creation-container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/new-game')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='bg-muted flex min-h-svh w-full flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-6 px-4 md:max-w-3xl md:px-0'>
        <Card className='overflow-hidden p-0'>
          <CardContent className='grid p-0 md:grid-cols-2'>
            <div className='flex flex-col gap-6 p-6 md:p-8'>
              <div className='space-y-2'>
                <h3>Create your session</h3>
                <p className='text-muted-foreground'>
                  Skip the hands up session and let the computer do the work.
                </p>
              </div>
              <SessionCreationContainer />
            </div>
            <div className='bg-muted relative hidden md:block'>
              <img
                src='/cat-poker-create-game.webp'
                alt='Cat playing poker'
                className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] dark:grayscale'
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
