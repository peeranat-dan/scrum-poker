import * as XLSX from 'xlsx';

import { type Participant } from '@/domain/participant/types';
import { type Round } from '@/domain/round/types';
import { type Vote } from '@/domain/vote/types';

export interface RoundWithVotes {
  round: Round;
  votes: Vote[];
}

/**
 * Builds an XLSX workbook from session voting data.
 *
 * The workbook contains a single sheet with one row per round.
 * Columns: Round | <participant names...> | Average
 *
 * @param sessionName - The session name used as the sheet name (truncated to 31 chars)
 * @param participants - All participants (including those who left/were removed)
 * @param roundsWithVotes - Rounds with their associated votes, sorted by createdAt asc
 * @returns An XLSX workbook ready to be written to file
 */
export function buildVotesWorkbook(
  sessionName: string,
  participants: Participant[],
  roundsWithVotes: RoundWithVotes[],
): XLSX.WorkBook {
  const nonSpectators = participants.filter((p) => p.role !== 'spectator');

  const headers = ['Round', ...nonSpectators.map((p) => p.displayName), 'Average'];

  const rows: (string | number)[][] = roundsWithVotes.map(({ round, votes }, index) => {
    const votesByParticipantId = votes.reduce(
      (acc, vote) => {
        acc[vote.participantId] = vote.value;
        return acc;
      },
      {} as Record<string, number>,
    );

    const voteValues = nonSpectators.map((p) => votesByParticipantId[p.id] ?? '');

    return [index + 1, ...voteValues, round.averageVote ?? ''];
  });

  const sheetData = [headers, ...rows];
  const sheet = XLSX.utils.aoa_to_sheet(sheetData);

  const wb = XLSX.utils.book_new();
  // Excel sheet names are limited to 31 characters
  const sheetName = sessionName.slice(0, 31);
  XLSX.utils.book_append_sheet(wb, sheet, sheetName);

  return wb;
}
