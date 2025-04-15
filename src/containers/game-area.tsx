import VotesChart from "@/components/votes-chart";
import { useGame } from "@/providers/game";
import GameCards from "./game-cards";
import GameAverage from "./game-average";

export default function GameArea() {
  const { round, participants, cards } = useGame();

  const voteCounts = participants.reduce((acc, participant) => {
    const vote = participant.vote;
    if (vote) {
      acc[vote] = (acc[vote] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const votes = Object.entries(voteCounts)
    .map(([vote, count]) => {
      console.log(cards.find((card) => card.value === parseInt(vote)));
      return {
        label:
          cards.find((card) => card.value === parseInt(vote))?.displayValue ??
          "",
        vote: vote,
        count,
      };
    })
    .sort((a, b) => parseInt(a.vote) - parseInt(b.vote));

  if (!round) {
    return null;
  }

  if (round.status === "in-progress") {
    return <GameCards />;
  }

  return (
    <div className="flex items-center gap-4 w-full justify-center">
      <VotesChart votes={votes} />
      <GameAverage />
    </div>
  );
}
