import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

import { Icons } from '@/components/icons/icons';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import config from '@/config';
import HeroParticles from '@/containers/hero-particles';

export const Route = createFileRoute('/(app)/')({
  component: Index,
});

const STEPS = [
  {
    title: 'Create a Session',
    description: 'Start a new planning poker session and add your user stories or tasks.',
  },
  {
    title: 'Invite Your Team',
    description: 'Share the session link with your team members so they can join instantly.',
  },
  {
    title: 'Vote & Discuss',
    description:
      'Everyone votes on story points, results are revealed, and you can discuss to reach consensus.',
  },
] as const;

const ARROW_NUDGE =
  'transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none';

function Index() {
  return (
    <div className="flex w-full flex-col">
      <section className="relative py-12 text-center md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-6">
            <Reveal onMount blur>
              <h1 className="bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text text-3xl font-bold tracking-tighter text-balance text-transparent sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl dark:from-white dark:to-white/40">
                E-Mate is a coffee mate <br className="hidden md:block" />
                for your planning poker.
              </h1>
            </Reveal>
            <Reveal onMount blur delay={0.08}>
              <p className="text-foreground/50">
                Create a session and invite your team to estimate their tasks{' '}
                <br className="hidden md:block" />
                with ease. Built with React, Tailwind, and shadcn/ui.
              </p>
            </Reveal>
            <Reveal onMount delay={0.16} className="w-full sm:w-fit">
              <Button size="lg" className="group w-full sm:w-fit" asChild>
                <Link to="/new-game">
                  Start new game
                  <ArrowRight className={ARROW_NUDGE} />
                </Link>
              </Button>
            </Reveal>
          </div>
          <HeroParticles />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Reveal className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/30">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Simple, Intuitive Process
              </h2>
              <p className="text-foreground/75">
                Get started with E-Mate in just a few simple steps.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {STEPS.map(({ title, description }, index) => (
              <Reveal
                key={title}
                delay={index * 0.08}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  {index + 1}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-foreground/50">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <Reveal className="flex flex-col gap-2">
              <h2 className="text-3xl tracking-tighter text-primary-foreground sm:text-4xl">
                Ready to Improve Your Estimation Process?
              </h2>
              <p className="text-primary-foreground">
                Let's make it easier for your team to estimate their tasks.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button variant="secondary" className="group" asChild>
                <Link to="/new-game">
                  <ArrowRight className={ARROW_NUDGE} />
                  Start new game
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to={config.app.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Icons.GitHub className="h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
