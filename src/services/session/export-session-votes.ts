import * as XLSX from 'xlsx';

import { searchParticipants } from '@/data/participant/search-participants';
import { searchRounds } from '@/data/round/search-rounds';
import { getSession } from '@/data/session/get-session';
import { searchVotes } from '@/data/vote/search-votes';
import { buildVotesWorkbook } from '@/lib/xlsx/build-votes-workbook';
import { checkIfUserCanManageSession } from './access-control';

/**
 * Exports all voting data for a session as an XLSX file download.
 *
 * Fetches all finished and revealed rounds with their votes, then triggers
 * a browser file download. Only session owners and admins can export.
 *
 * @param sessionId - The ID of the session to export
 * @throws If the user is not authenticated or does not have manage permissions
 */
export async function exportSessionVotes(sessionId: string): Promise<void> {
  await checkIfUserCanManageSession(sessionId);

  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found');

  const [participants, rounds] = await Promise.all([
    searchParticipants({ filter: { sessionId }, order: { field: 'createdAt', direction: 'asc' } }),
    searchRounds({
      filter: {
        sessionId,
        status: { op: 'in', value: ['finished', 'revealed'] },
      },
      order: { field: 'createdAt', direction: 'asc' },
    }),
  ]);

  const roundsWithVotes = await Promise.all(
    rounds.map(async (round) => ({
      round,
      votes: await searchVotes({
        filter: { roundId: round.id },
      }),
    })),
  );

  const wb = buildVotesWorkbook(session.name, participants, roundsWithVotes);
  XLSX.writeFile(wb, `${session.name}-votes.xlsx`);
}
