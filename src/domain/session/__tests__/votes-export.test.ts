import { describe, expect, it } from 'vitest';

import { type Participant } from '../../participant/types';
import { type Round } from '../../round/types';
import { type Vote } from '../../vote/types';
import {
  buildVotesExportSheet,
  toParticipantHeaders,
  toVoteCell,
  toVotesExportFileName,
  toVotesExportSheetName,
} from '../votes-export';

function makeParticipant(overrides: Partial<Participant> & Pick<Participant, 'id'>): Participant {
  return {
    sessionId: 's1',
    uid: `uid-${overrides.id}`,
    displayName: `Player ${overrides.id}`,
    role: 'player',
    status: 'active',
    createdAt: new Date(2026, 0, 1),
    updatedAt: new Date(2026, 0, 1),
    ...overrides,
  };
}

function makeRound(overrides: Partial<Round> & Pick<Round, 'id'>): Round {
  return {
    sessionId: 's1',
    status: 'finished',
    averageVote: null,
    issueId: null,
    createdAt: new Date(2026, 0, 1),
    updatedAt: new Date(2026, 0, 1),
    ...overrides,
  };
}

function makeVote(roundId: string, participantId: string, value: number): Vote {
  return {
    id: `${roundId}-${participantId}`,
    roundId,
    participantId,
    value,
    createdAt: new Date(2026, 0, 1),
    updatedAt: new Date(2026, 0, 1),
  };
}

describe('votes export', () => {
  describe('toVotesExportFileName', () => {
    it('appends -votes.xlsx to the session name', () => {
      expect(toVotesExportFileName('Sprint 12')).toBe('Sprint 12-votes.xlsx');
    });

    it('removes characters that are invalid in file names', () => {
      expect(toVotesExportFileName('a/b:c*?')).toBe('abc-votes.xlsx');
    });

    it('falls back when the name is empty', () => {
      expect(toVotesExportFileName('  ')).toBe('session-votes.xlsx');
    });
  });

  describe('toVotesExportSheetName', () => {
    it('truncates to 31 characters', () => {
      const name = 'a'.repeat(40);
      expect(toVotesExportSheetName(name)).toHaveLength(31);
    });

    it('removes characters that are invalid in sheet names', () => {
      expect(toVotesExportSheetName('[Q1] sprint: 1/2?')).toBe('Q1 sprint 12');
    });

    it('falls back when the name is empty', () => {
      expect(toVotesExportSheetName('[]')).toBe('Votes');
    });
  });

  describe('toParticipantHeaders', () => {
    it('keeps unique names as is', () => {
      const participants = [
        makeParticipant({ id: '1', displayName: 'Alice' }),
        makeParticipant({ id: '2', displayName: 'Bob' }),
      ];
      expect(toParticipantHeaders(participants)).toEqual(['Alice', 'Bob']);
    });

    it('appends uid to duplicated names', () => {
      const participants = [
        makeParticipant({ id: '1', displayName: 'Alice', uid: 'u1' }),
        makeParticipant({ id: '2', displayName: 'Alice', uid: 'u2' }),
        makeParticipant({ id: '3', displayName: 'Bob' }),
      ];
      expect(toParticipantHeaders(participants)).toEqual(['Alice-u1', 'Alice-u2', 'Bob']);
    });
  });

  describe('toVoteCell', () => {
    it('keeps fibonacci values numeric', () => {
      expect(toVoteCell(8, 'fibonacci')).toBe(8);
      expect(toVoteCell(0, 'fibonacci')).toBe(0);
    });

    it('maps t-shirt values to size labels', () => {
      expect(toVoteCell(0, 't-shirt')).toBe('XS');
      expect(toVoteCell(2, 't-shirt')).toBe('M');
      expect(toVoteCell(5, 't-shirt')).toBe('XXL');
    });

    it('maps special cards to -', () => {
      expect(toVoteCell(-1, 'fibonacci')).toBe('-');
      expect(toVoteCell(-2, 'fibonacci')).toBe('-');
      expect(toVoteCell(-1, 't-shirt')).toBe('-');
      expect(toVoteCell(-2, 't-shirt')).toBe('-');
    });

    it('falls back to the raw value for unknown values', () => {
      expect(toVoteCell(4, 'fibonacci')).toBe(4);
    });
  });

  describe('buildVotesExportSheet', () => {
    const owner = makeParticipant({
      id: 'p1',
      displayName: 'Owner',
      role: 'owner',
      createdAt: new Date(2026, 0, 1),
    });
    const left = makeParticipant({
      id: 'p2',
      displayName: 'Left',
      status: 'left',
      createdAt: new Date(2026, 0, 2),
    });
    const removed = makeParticipant({
      id: 'p3',
      displayName: 'Removed',
      status: 'removed',
      createdAt: new Date(2026, 0, 3),
    });
    const spectator = makeParticipant({
      id: 'p4',
      displayName: 'Spectator',
      role: 'spectator',
      createdAt: new Date(2026, 0, 4),
    });

    it('builds header and rows ordered by round creation time', () => {
      const rounds = [
        makeRound({ id: 'r2', averageVote: 5, createdAt: new Date(2026, 0, 2) }),
        makeRound({
          id: 'r1',
          averageVote: 2,
          issueId: 'PROJ-1',
          createdAt: new Date(2026, 0, 1),
        }),
      ];
      const votes = [
        makeVote('r1', 'p1', 1),
        makeVote('r1', 'p2', 3),
        makeVote('r2', 'p1', 5),
        makeVote('r2', 'p3', -1),
      ];

      const sheet = buildVotesExportSheet({
        session: { name: 'Sprint 1', votingSystem: 'fibonacci' },
        participants: [removed, spectator, left, owner],
        rounds,
        votes,
      });

      expect(sheet.fileName).toBe('Sprint 1-votes.xlsx');
      expect(sheet.sheetName).toBe('Sprint 1');
      expect(sheet.rows).toEqual([
        ['Round', 'Issue', 'Owner', 'Left', 'Removed', 'Average'],
        [1, 'PROJ-1', 1, 3, null, 2],
        [2, null, 5, null, '-', 5],
      ]);
    });

    it('excludes in-progress rounds', () => {
      const sheet = buildVotesExportSheet({
        session: { name: 'S', votingSystem: 'fibonacci' },
        participants: [owner],
        rounds: [
          makeRound({ id: 'r1', status: 'revealed', averageVote: 3 }),
          makeRound({ id: 'r2', status: 'in-progress' }),
        ],
        votes: [makeVote('r1', 'p1', 3), makeVote('r2', 'p1', 8)],
      });

      expect(sheet.rows).toEqual([
        ['Round', 'Issue', 'Owner', 'Average'],
        [1, null, 3, 3],
      ]);
    });

    it('leaves average blank when unavailable or no numeric votes exist', () => {
      const sheet = buildVotesExportSheet({
        session: { name: 'S', votingSystem: 'fibonacci' },
        participants: [owner],
        rounds: [
          makeRound({ id: 'r1', averageVote: null, createdAt: new Date(2026, 0, 1) }),
          makeRound({ id: 'r2', averageVote: 0, createdAt: new Date(2026, 0, 2) }),
        ],
        votes: [makeVote('r1', 'p1', 3), makeVote('r2', 'p1', -2)],
      });

      expect(sheet.rows.slice(1)).toEqual([
        [1, null, 3, null],
        [2, null, '-', null],
      ]);
    });

    it('maps t-shirt votes to labels and keeps the average numeric', () => {
      const sheet = buildVotesExportSheet({
        session: { name: 'S', votingSystem: 't-shirt' },
        participants: [owner, left],
        rounds: [makeRound({ id: 'r1', averageVote: 2.5 })],
        votes: [makeVote('r1', 'p1', 2), makeVote('r1', 'p2', 3)],
      });

      expect(sheet.rows.slice(1)).toEqual([[1, null, 'M', 'L', 2.5]]);
    });
  });
});
