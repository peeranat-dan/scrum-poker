import GameArea from '@/containers/game-area';
import GameController from '@/containers/game-controller';
import GameExitConfirmationModal from '@/containers/game-exit-confirmation-modal';
import GameParticipants from '@/containers/game-participants';
import UserProfileModal from '@/containers/user-profile-modal';
import { useParticipant } from '@/providers/participant';
import { generatePath, Navigate, useParams } from 'react-router';

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const { participant } = useParticipant();

  if (!participant) {
    return <Navigate to={generatePath('/join/:gameId', { gameId: gameId ?? '' })} />;
  }

  return (
    <div className='relative flex w-full flex-col items-center justify-center px-4 lg:px-0'>
      <div className='no-scrollbar fixed top-[var(--header-height)] flex w-full items-center justify-center overflow-x-scroll py-4 lg:absolute lg:top-0'>
        <GameParticipants />
      </div>
      <GameController />
      <div className='no-scrollbar fixed bottom-0 flex w-full items-center justify-center overflow-x-scroll lg:absolute'>
        <GameArea />
      </div>
      <UserProfileModal />
      <GameExitConfirmationModal />
    </div>
  );
}
