import * as XLSX from 'xlsx';
import { describe, expect, it } from 'vitest';

import { type Participant } from '@/domain/participant/types';
import { type Round } from '@/domain/round/types';
import { type Vote } from '@/domain/vote/types';
import { buildVotesWorkbook, type RoundWithVotes } from '../build-votes-workbook';

const makeParticipant = (overrides: Partial<Participant> = {}): Participant => ({
  id: 'p1',
  sessionId: 'session1',
  uid: 'uid1',
  displayName: 'Alice',
  role: 'player',
  status: 'active',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const makeRound = (overrides: Partial<Round> = {}): Round => ({
  id: 'r1',
  sessionId: 'session1',
  status: 'finished',
  averageVote: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

const makeVote = (overrides: Partial<Vote> = {}): Vote => ({
  id: 'v1',
  roundId: 'r1',
  participantId: 'p1',
  value: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

function getSheetData(wb: XLSX.WorkBook, sheetName: string): unknown[][] {
  const sheet = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];
}

describe('buildVotesWorkbook', () => {
  it('returns workbook with one sheet named after the session', () => {
    const wb = buildVotesWorkbook('My Session', [], []);
    expect(wb.SheetNames).toHaveLength(1);
    expect(wb.SheetNames[0]).toBe('My Session');
  });

  it('truncates sheet name to 31 characters', () => {
    const longName = 'A'.repeat(40);
    const wb = buildVotesWorkbook(longName, [], []);
    expect(wb.SheetNames[0]).toHaveLength(31);
  });

  it('returns header-only sheet when no rounds provided', () => {
    const participants = [makeParticipant({ displayName: 'Alice' })];
    const wb = buildVotesWorkbook('Session', participants, []);
    const data = getSheetData(wb, 'Session');
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual(['Round', 'Alice', 'Average']);
  });

  it('fills vote values for each participant per round', () => {
    const alice = makeParticipant({ id: 'p1', displayName: 'Alice' });
    const bob = makeParticipant({ id: 'p2', displayName: 'Bob', uid: 'uid2' });
    const participants = [alice, bob];

    const round = makeRound({ id: 'r1', averageVote: 6 });
    const votes: Vote[] = [
      makeVote({ id: 'v1', roundId: 'r1', participantId: 'p1', value: 5 }),
      makeVote({ id: 'v2', roundId: 'r1', participantId: 'p2', value: 8 }),
    ];
    const roundsWithVotes: RoundWithVotes[] = [{ round, votes }];

    const wb = buildVotesWorkbook('Session', participants, roundsWithVotes);
    const data = getSheetData(wb, 'Session');

    expect(data[0]).toEqual(['Round', 'Alice', 'Bob', 'Average']);
    expect(data[1]).toEqual([1, 5, 8, 6]);
  });

  it('uses empty string for missing votes', () => {
    const alice = makeParticipant({ id: 'p1', displayName: 'Alice' });
    const bob = makeParticipant({ id: 'p2', displayName: 'Bob', uid: 'uid2' });
    const participants = [alice, bob];

    const round = makeRound({ id: 'r1', averageVote: 5 });
    // Only Alice voted
    const votes: Vote[] = [makeVote({ id: 'v1', roundId: 'r1', participantId: 'p1', value: 5 })];
    const roundsWithVotes: RoundWithVotes[] = [{ round, votes }];

    const wb = buildVotesWorkbook('Session', participants, roundsWithVotes);
    const data = getSheetData(wb, 'Session');

    expect(data[1]).toEqual([1, 5, '', 5]);
  });

  it('excludes spectators from columns', () => {
    const alice = makeParticipant({ id: 'p1', displayName: 'Alice', role: 'player' });
    const spectator = makeParticipant({ id: 'p2', displayName: 'Observer', role: 'spectator', uid: 'uid2' });
    const participants = [alice, spectator];

    const wb = buildVotesWorkbook('Session', participants, []);
    const data = getSheetData(wb, 'Session');

    expect(data[0]).toEqual(['Round', 'Alice', 'Average']);
    expect(data[0]).not.toContain('Observer');
  });

  it('numbers rounds sequentially starting at 1', () => {
    const participants = [makeParticipant()];
    const roundsWithVotes: RoundWithVotes[] = [
      { round: makeRound({ id: 'r1' }), votes: [] },
      { round: makeRound({ id: 'r2' }), votes: [] },
      { round: makeRound({ id: 'r3' }), votes: [] },
    ];

    const wb = buildVotesWorkbook('Session', participants, roundsWithVotes);
    const data = getSheetData(wb, 'Session');

    expect(data[1][0]).toBe(1);
    expect(data[2][0]).toBe(2);
    expect(data[3][0]).toBe(3);
  });

  it('uses empty string for null averageVote', () => {
    const participants = [makeParticipant()];
    const roundsWithVotes: RoundWithVotes[] = [
      { round: makeRound({ id: 'r1', averageVote: null }), votes: [] },
    ];

    const wb = buildVotesWorkbook('Session', participants, roundsWithVotes);
    const data = getSheetData(wb, 'Session');

    // Average column is last
    const averageCell = data[1][data[1].length - 1];
    expect(averageCell).toBe('');
  });
});
