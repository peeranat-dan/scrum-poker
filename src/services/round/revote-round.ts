import { getRound } from '@/data/round/get-round';
import { updateRound } from '@/data/round/update-round';
import { canRevoteRound } from '@/domain/round/rules';

export async function revoteRound(roundId: string) {
  const round = await getRound(roundId);

  canRevoteRound(round);

  await updateRound(round.id, {
    status: 'in-progress',
    averageVote: null,
  });
}
