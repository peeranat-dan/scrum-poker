import { Link } from "react-router";
import { buttonVariants } from "../ui/button-variants";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b px-6 md:px-8 bg-background/80 backdrop-blur">
      <div className="container flex h-[3.5rem] items-center justify-between mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-mono font-semibold">E-mate</div>
        </Link>
        <div className="ml-auto flex h-full items-center gap-2">
          <ThemeToggle />
          <Link
            className={buttonVariants({ variant: "secondary" })}
            to="/new-game"
          >
            Start new game
          </Link>
        </div>
      </div>
    </header>
  );
}
