import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import config from '@/config';
import HeroParticles from '@/containers/hero-particles';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/(app)/')({
  component: Index,
});

function Index() {
  return (
    <div className='flex w-full flex-col'>
      <section className='relative py-12 text-center md:py-24 lg:py-32'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col items-center gap-6'>
            <h1 className='bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-3xl font-bold tracking-tighter text-balance text-transparent sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl dark:from-white dark:to-white/40'>
              E-Mate is a coffee mate <br className='hidden md:block' />
              for your planning poker.
            </h1>
            <p className='text-foreground/50'>
              Create a session and invite your team to estimate their tasks{' '}
              <br className='hidden md:block' />
              with ease. Built with React, Tailwind, and shadcn/ui.
            </p>
            <Button size='lg' className='w-full sm:w-fit'>
              Start new game
            </Button>
          </div>
          <HeroParticles />
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='text-primary bg-primary/10 dark:bg-primary/30 inline-block rounded-lg px-3 py-1 text-sm'>
                How It Works
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Simple, Intuitive Process
              </h2>
              <p className='text-foreground/75'>
                Get started with E-Mate in just a few simple steps.
              </p>
            </div>
          </div>
          <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white'>
                1
              </div>
              <div className='space-y-2'>
                <h3 className='text-xl font-bold'>Create a Session</h3>
                <p className='text-foreground/50'>
                  Start a new planning poker session and add your user stories or tasks.
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white'>
                2
              </div>
              <div className='space-y-2'>
                <h3 className='text-xl font-bold'>Invite Your Team</h3>
                <p className='text-foreground/50'>
                  Share the session link with your team members so they can join instantly.
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white'>
                3
              </div>
              <div className='space-y-2'>
                <h3 className='text-xl font-bold'>Vote & Discuss</h3>
                <p className='text-foreground/50'>
                  Everyone votes on story points, results are revealed, and you can discuss to reach
                  consensus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-primary py-12 md:py-24 lg:py-32'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-primary-foreground text-3xl tracking-tighter sm:text-4xl'>
                Ready to Improve Your Estimation Process?
              </h2>
              <p className='text-primary-foreground'>
                Let's make it easier for your team to estimate their tasks.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Button variant='secondary' asChild>
                <Link to='/new-game'>
                  <ArrowRight />
                  Start new game
                </Link>
              </Button>
              <Button variant='outline' asChild>
                <Link to={config.app.githubUrl} target='_blank' rel='noopener noreferrer'>
                  <Icons.gitHub className='h-4 w-4' />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
