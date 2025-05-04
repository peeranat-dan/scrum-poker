import { useGame } from '@/providers/game';
import GameCards from './game-cards';
import GameAverage from './game-average';
import VotesChart from './vote-charts';

export default function GameArea() {
  const { round } = useGame();

  if (!round) {
    return null;
  }

  if (round.status === 'in-progress') {
    return <GameCards />;
  }

  return (
    <div className='flex w-full items-center justify-center gap-4'>
      <VotesChart />
      <GameAverage />
    </div>
  );
}
