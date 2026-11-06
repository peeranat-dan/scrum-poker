import { useGame } from '@/providers/game';

export default function GameAverage() {
  const { round } = useGame();

  if (!round) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className="text-sm text-muted-foreground">Game Average</p>
      <p className="text-4xl font-bold tabular-nums">{round.averageVote ?? 'No votes yet'}</p>
    </div>
  );
}
