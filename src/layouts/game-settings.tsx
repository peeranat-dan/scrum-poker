import { buttonVariants } from '@/components/ui/button-variants';
import { useParticipant } from '@/providers/participant';
import { Settings, Users2 } from 'lucide-react';
import { generatePath, Navigate, NavLink, Outlet, useParams } from 'react-router';

const items = [
  {
    label: 'General',
    to: 'general',
    icon: Settings,
  },
  {
    label: 'Players',
    to: 'players',
    icon: Users2,
  },
];

export default function GameSettingsLayout() {
  const { gameId } = useParams<{ gameId: string }>();
  const { participant } = useParticipant();

  if (!gameId) {
    throw new Error('Game ID is required');
  }

  if (!participant) {
    return <Navigate to={generatePath('/join/:gameId', { gameId: gameId })} />;
  }

  return (
    <div className='mx-auto flex max-w-3xl flex-1 px-4 py-8 md:px-0'>
      <nav className='flex w-fit flex-col space-y-2 border-r pr-2 md:w-48'>
        <p className='text-sidebar-foreground/70 hidden text-xs font-semibold md:block'>
          Game Settings
        </p>
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              buttonVariants({
                variant: isActive ? 'secondary' : 'ghost',
                className: 'w-fit justify-start md:w-full',
              })
            }
          >
            <Icon className='h-4 w-4' />
            <span className='hidden md:block'>{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className='flex flex-1 overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
}
