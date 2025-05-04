import { findVote } from '@/data/vote/find-vote';
import { assertValid } from '@/shared/zod/utils';
import { GetParticipantVoteByRoundIdSchema } from './schemas';
import { type GetParticipantVoteByRoundIdInput } from './types';

export async function getParticipantVoteByRoundId(input: GetParticipantVoteByRoundIdInput) {
  const { roundId, participantId } = assertValid(GetParticipantVoteByRoundIdSchema, input);
  const vote = await findVote({
    filter: {
      roundId,
      participantId,
    },
  });

  return vote;
}
