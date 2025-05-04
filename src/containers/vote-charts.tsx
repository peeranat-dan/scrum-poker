import FibonacciVotesChart from '@/components/fibonacci-votes-chart';
import TShirtVotesChart from '@/components/t-shirt-votes-chart';
import { useGame } from '@/providers/game';
import { useSession } from '@/providers/session';

export default function VotesChart() {
  const { cards, participants } = useGame();
  const { votingSystem } = useSession();

  const data = cards.map((card) => {
    const count = participants.filter((participant) => participant.vote === card.value).length;
    return {
      label: card.displayValue,
      count,
      fill: `var(--color-${card.displayValue})`,
    };
  });

  if (votingSystem === 'fibonacci') {
    return <FibonacciVotesChart votes={data} />;
  }

  return <TShirtVotesChart votes={data} />;
}
