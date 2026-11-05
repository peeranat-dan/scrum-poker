import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type Participant } from '@/domain/participant/types';

import { auth } from '../../auth';
import { findCurrentUserParticipant } from '../find-current-user-participant';
import { findParticipant } from '../find-participant';

vi.mock('../../auth', () => ({ auth: { currentUser: null } }));
vi.mock('../find-participant', () => ({ findParticipant: vi.fn() }));

describe('findCurrentUserParticipant', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    Object.assign(auth, { currentUser: null });
  });

  it('throws when the user is not authenticated', async () => {
    await expect(findCurrentUserParticipant('s1')).rejects.toThrow('User not authenticated');
    expect(findParticipant).not.toHaveBeenCalled();
  });

  it('finds the participant by session id and current user uid', async () => {
    Object.assign(auth, { currentUser: { uid: 'u1' } });
    vi.mocked(findParticipant).mockResolvedValue({ id: 'p1' } as Participant);

    await expect(findCurrentUserParticipant('s1')).resolves.toEqual({ id: 'p1' });
    expect(findParticipant).toHaveBeenCalledWith({ filter: { sessionId: 's1', uid: 'u1' } });
  });
});
