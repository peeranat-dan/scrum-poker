import { getCards } from '@/shared/card/utils';
import { type VotingSystem } from '@/shared/zod/enum';

import { hasVotingRole } from '../participant/rules';
import { type Participant } from '../participant/types';
import { hasRoundBeenRevealed } from '../round/rules';
import { type Round } from '../round/types';
import { type Vote } from '../vote/types';
import { type Session } from './types';

/** Excel limits sheet names to 31 characters */
const MAX_SHEET_NAME_LENGTH = 31;

/** Characters Excel does not allow in sheet names */
const INVALID_SHEET_NAME_CHARS = /[\\/?*[\]:]/g;

/** Cell value for special cards (`?`, `🙅🏼`) that carry no estimate */
const SPECIAL_VOTE_CELL = '-';

/** Characters most file systems do not allow in file names */
const INVALID_FILE_NAME_CHARS = /[\\/:*?"<>|]/g;

export type VotesExportCell = string | number | null;

export interface VotesExportSheet {
  fileName: string;
  sheetName: string;
  rows: VotesExportCell[][];
}

export interface BuildVotesExportSheetInput {
  session: Pick<Session, 'name' | 'votingSystem'>;
  participants: Participant[];
  rounds: Round[];
  votes: Vote[];
}

/**
 * Builds the file name of the votes export, e.g. `Sprint 12-votes.xlsx`.
 *
 * @param sessionName The session name
 * @returns The file name with characters that are invalid in file names removed
 */
export function toVotesExportFileName(sessionName: string) {
  const name = sessionName.replace(INVALID_FILE_NAME_CHARS, '').trim();
  // NOTE: `||` instead of `??` so an empty name also falls back
  return `${name || 'session'}-votes.xlsx`;
}

/**
 * Builds a valid Excel sheet name from the session name.
 *
 * @param sessionName The session name
 * @returns The sheet name, stripped of invalid characters and truncated to 31 characters
 */
export function toVotesExportSheetName(sessionName: string) {
  const name = sessionName.replace(INVALID_SHEET_NAME_CHARS, '').trim();
  // NOTE: `||` instead of `??` so an empty name also falls back
  return (name || 'Votes').slice(0, MAX_SHEET_NAME_LENGTH).trim();
}

/**
 * Builds participant column headers. Duplicated display names are suffixed with
 * the participant uid (`name-uid`) so every column is distinguishable.
 *
 * @param participants The participants, in column order
 * @returns The headers, in the same order as the participants
 */
export function toParticipantHeaders(participants: Participant[]) {
  const nameCounts = new Map<string, number>();
  for (const { displayName } of participants) {
    nameCounts.set(displayName, (nameCounts.get(displayName) ?? 0) + 1);
  }

  return participants.map(({ displayName, uid }) =>
    (nameCounts.get(displayName) ?? 0) > 1 ? `${displayName}-${uid}` : displayName,
  );
}

/**
 * Converts a raw vote value into the value shown in the sheet.
 * - Fibonacci numbers stay numeric so they can be used in spreadsheet formulas.
 * - T-shirt values become their size label (e.g. `2` -> `M`).
 * - Special cards (`-1`, `-2`) become `-`.
 *
 * @param value The raw vote value
 * @param votingSystem The session voting system
 */
export function toVoteCell(value: number, votingSystem: VotingSystem): VotesExportCell {
  const card = getCards(votingSystem).find((item) => item.value === value);

  if (!card) {
    return value;
  }

  if (!card.shouldIncludeInAverage) {
    return SPECIAL_VOTE_CELL;
  }

  return votingSystem === 'fibonacci' ? card.value : card.displayValue;
}

/**
 * Builds the votes export sheet of a session.
 *
 * Columns are `Round | <participant names...> | Average`, and each row is one
 * revealed or finished round ordered by creation time. Spectators are excluded,
 * while participants who left or were removed are kept.
 *
 * @param input The session data
 * @returns The file name, sheet name and rows (header row first)
 */
export function buildVotesExportSheet(input: BuildVotesExportSheetInput): VotesExportSheet {
  const { session, votes } = input;

  const participants = input.participants
    .filter(hasVotingRole)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const rounds = input.rounds
    .filter(hasRoundBeenRevealed)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const votesByRound = new Map<string, Map<string, number>>();
  for (const vote of votes) {
    const roundVotes = votesByRound.get(vote.roundId) ?? new Map<string, number>();
    roundVotes.set(vote.participantId, vote.value);
    votesByRound.set(vote.roundId, roundVotes);
  }

  const header: VotesExportCell[] = ['Round', ...toParticipantHeaders(participants), 'Average'];

  const rows = rounds.map((round, index): VotesExportCell[] => {
    const roundVotes = votesByRound.get(round.id);
    const values = participants.map((participant) => roundVotes?.get(participant.id));

    // NOTE: `averageVote` defaults to 0 when nobody cast a numeric card, which would
    // read as a real estimate, so leave it blank instead.
    const hasNumericVote = values.some((value) => value !== undefined && value >= 0);
    const average = hasNumericVote ? round.averageVote : null;

    return [
      index + 1,
      ...values.map((value) =>
        value === undefined ? null : toVoteCell(value, session.votingSystem),
      ),
      average,
    ];
  });

  return {
    fileName: toVotesExportFileName(session.name),
    sheetName: toVotesExportSheetName(session.name),
    rows: [header, ...rows],
  };
}
