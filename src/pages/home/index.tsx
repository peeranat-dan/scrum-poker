import { buttonVariants } from '@/components/ui/button-variants';
import HeroParticles from '@/containers/hero-particles';
import { cn } from '@/lib/cn';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className='mt-[var(--header-height)] flex w-full flex-col px-6 pb-8 md:px-8'>
      <section className='relative flex flex-col items-center gap-6 py-12 text-center'>
        <h1 className='bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-3xl font-bold tracking-tighter text-balance text-transparent sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl dark:from-white dark:to-white/40'>
          E-mate is a coffee mate <br className='hidden md:block' />
          for your planning poker.
        </h1>
        <p className='text-foreground/50'>
          Create a session and invite your team to estimate their tasks{' '}
          <br className='hidden md:block' />
          with ease. Built with React, Tailwind, and shadcn/ui.
        </p>
        <Link className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-fit')} to='/new-game'>
          Start new game
          <ArrowRight />
        </Link>
        <HeroParticles />
      </section>
      <section className='mx-auto mt-10 max-w-4xl text-center md:mt-12'>
        <div className='dark:border-accent/30 relative overflow-hidden rounded-xl border p-4'>
          <img
            src='/assets/e-mate-game-screen-dark.webp'
            alt='In game screenshot in dark mode'
            className='relative hidden h-full w-full object-contain dark:block'
          />
          <img
            src='/assets/e-mate-game-screen-light.webp'
            alt='In game screenshot in light mode'
            className='relative block h-full w-full object-contain dark:hidden'
          />
        </div>
      </section>
    </div>
  );
}
