import { beforeEach, describe, expect, it, vi } from 'vitest';

import { searchParticipants } from '@/data/participant/search-participants';
import { searchRounds } from '@/data/round/search-rounds';
import { getSession } from '@/data/session/get-session';
import { searchVotesByRoundIds } from '@/data/vote/search-votes-by-round-ids';
import { type Round } from '@/domain/round/types';
import { type Session } from '@/domain/session/types';

import { assertUserIsSessionOwner } from '../access-control';
import { exportSessionVotes } from '../export-session-votes';

vi.mock('@/data/session/get-session', () => ({ getSession: vi.fn() }));
vi.mock('@/data/participant/search-participants', () => ({ searchParticipants: vi.fn() }));
vi.mock('@/data/round/search-rounds', () => ({ searchRounds: vi.fn() }));
vi.mock('@/data/vote/search-votes-by-round-ids', () => ({ searchVotesByRoundIds: vi.fn() }));
vi.mock('../access-control', () => ({ assertUserIsSessionOwner: vi.fn() }));

const session = { id: 's1', name: 'Sprint 1', votingSystem: 'fibonacci' } as Session;

function makeRound(index: number) {
  return {
    id: `r${index}`,
    status: 'finished',
    averageVote: 1,
    createdAt: new Date(index),
  } as Round;
}

describe('exportSessionVotes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getSession).mockResolvedValue(session);
    vi.mocked(searchParticipants).mockResolvedValue([]);
    vi.mocked(searchRounds).mockResolvedValue([]);
    vi.mocked(searchVotesByRoundIds).mockResolvedValue([]);
  });

  it('throws when the session does not exist', async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    await expect(exportSessionVotes('s1')).rejects.toThrow('Session not found');
  });

  it('rejects users who are not the session owner', async () => {
    vi.mocked(assertUserIsSessionOwner).mockRejectedValue(
      new Error('Only the session owner can perform this action'),
    );
    await expect(exportSessionVotes('s1')).rejects.toThrow(
      'Only the session owner can perform this action',
    );
    expect(searchParticipants).not.toHaveBeenCalled();
  });

  it('queries the participants and rounds of the session', async () => {
    await exportSessionVotes('s1');

    expect(searchParticipants).toHaveBeenCalledWith({ filter: { sessionId: 's1' } });
    expect(searchRounds).toHaveBeenCalledWith({ filter: { sessionId: 's1' } });
  });

  it('queries votes of the exported rounds', async () => {
    vi.mocked(searchRounds).mockResolvedValue([makeRound(0), makeRound(1)]);

    await exportSessionVotes('s1');

    expect(searchVotesByRoundIds).toHaveBeenCalledWith(['r0', 'r1']);
  });

  it('returns the file name and xlsx content', async () => {
    const result = await exportSessionVotes('s1');

    expect(result.fileName).toBe('Sprint 1-votes.xlsx');
    expect(result.blob).toBeInstanceOf(Blob);
    expect(result.blob.size).toBeGreaterThan(0);
  });
});
