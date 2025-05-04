import { getRound } from '@/data/round/get-round';
import { findVote } from '@/data/vote/find-vote';
import { canCastOrUpdateVote } from '@/domain/vote/rules';

import { castVote } from './cast-vote';
import { type CastVoteInput } from './types';
import { updateVoteValue } from './update-vote-value';

export async function castOrUpdateVote(input: CastVoteInput) {
  // NOTE: We do not validate the input here because it is validated in the castVote and updateVoteValue functions
  const { participantId, roundId, value } = input;

  const existingVote = await findVote({
    filter: {
      roundId,
      participantId,
    },
  });
  const round = await getRound(roundId);

  canCastOrUpdateVote(round);

  if (!existingVote) {
    await castVote(input);
  } else {
    await updateVoteValue({
      id: existingVote.id,
      value,
    });
  }
}
