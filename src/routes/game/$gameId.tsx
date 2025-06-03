import GameArea from '@/containers/game-area';
import GameController from '@/containers/game-controller';
import GameExitConfirmationModal from '@/containers/game-exit-confirmation-modal';
import GameParticipants from '@/containers/game-participants';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game/$gameId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center px-4 lg:px-0'>
      <div className='no-scrollbar fixed top-[var(--header-height)] flex w-full items-center justify-center overflow-x-scroll lg:absolute lg:top-0'>
        <GameParticipants />
      </div>
      <GameController />
      <div className='no-scrollbar fixed bottom-0 flex w-full items-center justify-center overflow-x-scroll lg:absolute'>
        <GameArea />
      </div>
      <GameExitConfirmationModal />
    </div>
  );
}
