import { useGame } from "@/providers/game";

export default function GameAverage() {
  const { round } = useGame();

  if (!round) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Game Average</p>
      <p className="text-2xl font-bold">
        {round.averageVote ? round.averageVote : "No votes yet"}
      </p>
    </div>
  );
}
