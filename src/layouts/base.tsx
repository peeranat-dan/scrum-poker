import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

export default function BaseLayout() {
  return (
    <div className='relative flex min-h-dvh w-screen flex-col'>
      <Header />
      <main className='flex flex-1'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
