import { getRound } from '@/data/round/get-round';
import { updateRound } from '@/data/round/update-round';
import { normalizeIssueId } from '@/domain/round/issue';
import { canUpdateRoundIssueId } from '@/domain/round/rules';

import { assertUserIsSessionOwner } from '../session/access-control';

export interface UpdateRoundIssueIdInput {
  roundId: string;
  issueId: string | null;
}

/**
 * Sets the issue id (e.g. `PROJ-123`) of the round being estimated. Only the session
 * owner can change it, and only while the round is not finished.
 *
 * @param input The round id and the issue id; an empty issue id clears it
 * @throws When the round does not exist, is finished, or the user is not the owner
 */
export async function updateRoundIssueId({ roundId, issueId }: UpdateRoundIssueIdInput) {
  const round = await getRound(roundId);

  canUpdateRoundIssueId(round);

  await assertUserIsSessionOwner(round.sessionId);

  await updateRound(round.id, {
    issueId: normalizeIssueId(issueId),
  });
}
