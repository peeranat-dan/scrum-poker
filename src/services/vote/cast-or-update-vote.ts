import { getParticipant } from '@/data/participant/get-participant';
import { getRound } from '@/data/round/get-round';
import { findVote } from '@/data/vote/find-vote';
import { canVote } from '@/domain/participant/rules';
import { canCastOrUpdateVote } from '@/domain/vote/rules';
import { assertValid } from '@/shared/zod/utils';
import { castVote } from './cast-vote';
import { CastVoteSchema } from './schemas';
import { type CastVoteInput } from './types';
import { updateVoteValue } from './update-vote-value';

export async function castOrUpdateVote(input: CastVoteInput) {
  const { participantId, roundId, value } = assertValid(CastVoteSchema, input);

  const participant = await getParticipant(participantId);
  if (!canVote(participant)) {
    throw new Error('Participant is not allowed to vote');
  }

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
