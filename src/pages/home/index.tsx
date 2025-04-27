import { buttonVariants } from "@/components/ui/button-variants";
import HeroParticles from "@/containers/hero-particles";
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full mt-[var(--header-height)] px-6 md:px-8 pb-8">
      <section className="text-center relative flex flex-col gap-6 py-12 items-center">
        <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-3xl font-bold tracking-tighter text-transparent text-balance sm:text-4xl md:text-5xl lg:text-6xl sm:leading-[1.1]">
          E-mate is a coffee mate <br className="hidden md:block" />
          for your planning poker.
        </h1>
        <p className="text-foreground/50">
          Create a session and invite your team to estimate their tasks{" "}
          <br className="hidden md:block" />
          with ease. Built with React, Tailwind, and shadcn/ui.
        </p>
        <Link
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
          to="/new-game"
        >
          Start new game
          <ArrowRight />
        </Link>
        <HeroParticles />
      </section>
      <section className="max-w-4xl mx-auto text-center mt-10 md:mt-12">
        <div className="relative rounded-xl border dark:border-accent/30 overflow-hidden p-4">
          <img
            src="/assets/e-mate-game-screen-dark.webp"
            alt="In game screenshot in dark mode"
            className="hidden relative w-full h-full object-contain dark:block"
          />
          <img
            src="/assets/e-mate-game-screen-light.webp"
            alt="In game screenshot in light mode"
            className="block relative w-full h-full object-contain dark:hidden"
          />
        </div>
      </section>
    </div>
  );
}
