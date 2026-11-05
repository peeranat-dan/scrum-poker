import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type Vote } from '@/domain/vote/types';

import { searchVotes } from '../search-votes';
import { searchVotesByRoundIds } from '../search-votes-by-round-ids';

vi.mock('../search-votes', () => ({ searchVotes: vi.fn() }));

describe('searchVotesByRoundIds', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(searchVotes).mockResolvedValue([]);
  });

  it('does not query votes when there are no round ids', async () => {
    await expect(searchVotesByRoundIds([])).resolves.toEqual([]);
    expect(searchVotes).not.toHaveBeenCalled();
  });

  it('queries votes in batches of 30 round ids and merges the results', async () => {
    const roundIds = Array.from({ length: 31 }, (_, i) => `r${i}`);
    vi.mocked(searchVotes)
      .mockResolvedValueOnce([{ id: 'v1' } as Vote])
      .mockResolvedValueOnce([{ id: 'v2' } as Vote]);

    const votes = await searchVotesByRoundIds(roundIds);

    expect(searchVotes).toHaveBeenCalledTimes(2);
    expect(vi.mocked(searchVotes).mock.calls[1][0]).toEqual({
      filter: { roundId: { op: 'in', value: ['r30'] } },
    });
    expect(votes).toEqual([{ id: 'v1' }, { id: 'v2' }]);
  });
});
