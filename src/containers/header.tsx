import { Link } from '@tanstack/react-router';
import Logo from '../components/logo';
import { ThemeToggle } from '../components/theme-toggle';
import { buttonVariants } from '../components/ui/button-variants';
import UserInformationPanel from './user-information-panel';

export default function Header() {
  return (
    <header className='bg-background/80 sticky top-0 left-0 z-50 w-full border-b px-6 backdrop-blur md:px-8'>
      <div className='container mx-auto flex h-[3.5rem] items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <Logo />
        </Link>
        <div className='ml-auto flex h-full items-center gap-1 md:gap-2'>
          <ThemeToggle />
          <UserInformationPanel />
          <Link className={buttonVariants({ variant: 'secondary' })} to='/new-game'>
            Start new game
          </Link>
        </div>
      </div>
    </header>
  );
}
