import { buttonVariants } from "@/components/ui/button-variants";
import HeroParticles from "@/containers/hero-particles";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full py-12 px-6 md:px-8">
      <section className="text-center relative flex flex-col gap-6 py-6 items-center">
        <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-3xl font-bold tracking-tighter text-transparent text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          E-mate is a coffee mate
          <br className="hidden md:block" />
          for planning poker.
        </h1>
        <p className="text-foreground/50">
          Create a session and invite your team to estimate their tasks
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
    </div>
  );
}
