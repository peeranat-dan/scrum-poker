import { searchParticipants } from '@/data/participant/search-participants';
import { searchRounds } from '@/data/round/search-rounds';
import { getSession } from '@/data/session/get-session';
import { searchVotesByRoundIds } from '@/data/vote/search-votes-by-round-ids';
import { assertSessionExists } from '@/domain/session/rules';
import { buildVotesExportSheet } from '@/domain/session/votes-export';
import { writeXlsxBlob } from '@/lib/xlsx';

import { assertUserIsSessionOwner } from './access-control';

export interface ExportSessionVotesResult {
  fileName: string;
  blob: Blob;
}

/**
 * Exports the votes of every revealed or finished round of a session as an xlsx workbook.
 * Only the session owner can export. This service only builds the file; triggering the
 * download is left to the caller.
 *
 * @param sessionId The session id
 * @returns The file name and the xlsx file content
 * @throws When the session does not exist or the current user is not the owner
 */
export async function exportSessionVotes(sessionId: string): Promise<ExportSessionVotesResult> {
  const session = await getSession(sessionId);

  assertSessionExists(session);

  await assertUserIsSessionOwner(session.id);

  // NOTE: Spectators and unrevealed rounds are filtered out by `buildVotesExportSheet`
  const [participants, rounds] = await Promise.all([
    searchParticipants({ filter: { sessionId } }),
    searchRounds({ filter: { sessionId } }),
  ]);

  const votes = await searchVotesByRoundIds(rounds.map((round) => round.id));

  const { fileName, sheetName, rows } = buildVotesExportSheet({
    session,
    participants,
    rounds,
    votes,
  });

  const blob = await writeXlsxBlob(rows, sheetName);

  return { fileName, blob };
}
