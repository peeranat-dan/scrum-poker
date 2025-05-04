import { getRound } from '@/data/round/get-round';
import { getVote } from '@/data/vote/get-vote';
import { updateVote } from '@/data/vote/update-vote';
import { canUpdateVoteValue } from '@/domain/vote/rules';
import { assertValid } from '@/shared/zod/utils';

import { UpdateVoteValueSchema } from './schemas';
import { type UpdateVoteValueInput } from './types';

export async function updateVoteValue(input: UpdateVoteValueInput) {
  const { id, value } = assertValid(UpdateVoteValueSchema, input);

  const vote = await getVote(id);
  const round = await getRound(vote.roundId);

  canUpdateVoteValue(round, vote);

  await updateVote(id, { value });
}
