import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParticipant } from '@/providers/participant';
import { useSession } from '@/providers/session';
import { copyJoinLink } from '@/shared/utils/copy-join-link';
import { Link, Settings2 } from 'lucide-react';
import { generatePath, Link as NavLink, useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function GameHeader() {
  const { id } = useSession();
  const { participant } = useParticipant();
  const navigate = useNavigate();

  const handleCopyJoinLink = () => {
    if (participant) {
      copyJoinLink(participant.sessionId);
    }
    toast.success('Join link copied to clipboard');
  };

  const handleNavigateToSettings = () => {
    navigate(generatePath('/game/:gameId/settings', { gameId: id }));
  };

  const navigationLink = participant
    ? generatePath('/game/:gameId', { gameId: id })
    : generatePath('/join/:gameId', { gameId: id });

  return (
    <header className='flex h-[var(--header-height)] items-center justify-between p-4'>
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
        <NavLink to={navigationLink}>
          <Logo />
        </NavLink>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleCopyJoinLink}>
              <div className='bg-primary/30 dark:bg-accent flex cursor-pointer items-center gap-2 rounded-full px-4 py-2'>
                <Link className='h-4 w-4' />
                <span className='hidden font-mono text-sm md:block'>{id}</span>
                <span className='block font-mono text-sm md:hidden'>{id.substring(0, 8)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy join link to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='flex shrink-0 items-center gap-2'>
          <ThemeToggle />
          {participant?.role === 'owner' ? (
            <Button size='icon' variant='secondary' onClick={handleNavigateToSettings}>
              <Settings2 />
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
