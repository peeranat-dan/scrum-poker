import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getRound } from '@/data/round/get-round';
import { updateRound } from '@/data/round/update-round';
import { type Round } from '@/domain/round/types';

import { assertUserIsSessionOwner } from '../../session/access-control';
import { updateRoundIssueId } from '../update-round-issue-id';

vi.mock('@/data/round/get-round', () => ({ getRound: vi.fn() }));
vi.mock('@/data/round/update-round', () => ({ updateRound: vi.fn() }));
vi.mock('../../session/access-control', () => ({ assertUserIsSessionOwner: vi.fn() }));

const round = { id: 'r1', sessionId: 's1', status: 'in-progress', issueId: null } as Round;

describe('updateRoundIssueId', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(getRound).mockResolvedValue(round);
  });

  it('saves the trimmed issue id', async () => {
    await updateRoundIssueId({ roundId: 'r1', issueId: ' PROJ-1 ' });

    expect(assertUserIsSessionOwner).toHaveBeenCalledWith('s1');
    expect(updateRound).toHaveBeenCalledWith('r1', { issueId: 'PROJ-1' });
  });

  it('clears the issue id when it is empty', async () => {
    await updateRoundIssueId({ roundId: 'r1', issueId: '' });

    expect(updateRound).toHaveBeenCalledWith('r1', { issueId: null });
  });

  it('rejects finished rounds', async () => {
    vi.mocked(getRound).mockResolvedValue({ ...round, status: 'finished' });

    await expect(updateRoundIssueId({ roundId: 'r1', issueId: 'PROJ-1' })).rejects.toThrow(
      'Round is already finished',
    );
    expect(updateRound).not.toHaveBeenCalled();
  });

  it('rejects users who are not the session owner', async () => {
    vi.mocked(assertUserIsSessionOwner).mockRejectedValue(
      new Error('Only the session owner can perform this action'),
    );

    await expect(updateRoundIssueId({ roundId: 'r1', issueId: 'PROJ-1' })).rejects.toThrow(
      'Only the session owner can perform this action',
    );
    expect(updateRound).not.toHaveBeenCalled();
  });
});
