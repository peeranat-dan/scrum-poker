import { cn } from '@/lib/cn';
import { useGame } from '@/providers/game';

import GameAverage from './game-average';
import GameCards from './game-cards';
import VotesChart from './vote-charts';

/** Results rise in once per reveal; reduced motion keeps only the fade */
const resultEnterClassName =
  'transition-[opacity,translate] duration-200 ease-out-strong starting:translate-y-4 starting:opacity-0 motion-reduce:starting:translate-y-0';

export default function GameArea() {
  const { round } = useGame();

  if (!round) {
    return null;
  }

  if (round.status === 'in-progress') {
    return <GameCards />;
  }

  // NOTE: The chart sizes itself against this row (`w-1/4`), so it must stay a direct child
  return (
    <div className={cn('flex w-full items-center justify-center gap-4', resultEnterClassName)}>
      <VotesChart />
      <div className={cn(resultEnterClassName, 'delay-[40ms]')}>
        <GameAverage />
      </div>
    </div>
  );
}
