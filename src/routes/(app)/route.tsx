import { Toaster } from '@/components/ui/sonner';
import Header from '@/containers/header';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='relative flex min-h-dvh w-full flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
