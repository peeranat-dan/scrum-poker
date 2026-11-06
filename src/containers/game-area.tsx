import { useGame } from '@/providers/game';

import GameAverage from './game-average';
import GameCards from './game-cards';
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
    <div className="flex w-full items-center justify-center gap-4 transition-[opacity,translate] duration-200 ease-out-strong starting:translate-y-4 starting:opacity-0 motion-reduce:starting:translate-y-0">
      <VotesChart />
      <div className="transition-[opacity,translate] delay-[40ms] duration-200 ease-out-strong starting:translate-y-4 starting:opacity-0 motion-reduce:starting:translate-y-0">
        <GameAverage />
      </div>
    </div>
  );
}
