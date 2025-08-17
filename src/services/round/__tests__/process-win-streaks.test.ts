import { describe, expect, it, vi } from 'vitest';
import { processWinStreaks } from '../process-win-streaks';

// Mock the updateParticipant function
vi.mock('@/data/participant/update-participant', () => ({
  updateParticipant: vi.fn(),
}));

const mockUpdateParticipant = vi.mocked(await import('@/data/participant/update-participant')).updateParticipant;

describe('processWinStreaks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should increment win streak for participants who voted correctly', async () => {
    const participants = [
      { id: '1', winStreak: 2 },
      { id: '2', winStreak: 0 },
    ];
    
    const votes = [
      { participantId: '1', value: 5 },
      { participantId: '2', value: 5 },
    ];
    
    const originalEstimate = 5;

    await processWinStreaks({ participants, votes, originalEstimate });

    expect(mockUpdateParticipant).toHaveBeenCalledWith('1', { winStreak: 3 });
    expect(mockUpdateParticipant).toHaveBeenCalledWith('2', { winStreak: 1 });
  });

  it('should reset win streak for participants who voted incorrectly', async () => {
    const participants = [
      { id: '1', winStreak: 5 },
      { id: '2', winStreak: 3 },
    ];
    
    const votes = [
      { participantId: '1', value: 3 },
      { participantId: '2', value: 8 },
    ];
    
    const originalEstimate = 5;

    await processWinStreaks({ participants, votes, originalEstimate });

    expect(mockUpdateParticipant).toHaveBeenCalledWith('1', { winStreak: 0 });
    expect(mockUpdateParticipant).toHaveBeenCalledWith('2', { winStreak: 0 });
  });

  it('should not update participants who did not vote', async () => {
    const participants = [
      { id: '1', winStreak: 2 },
      { id: '2', winStreak: 1 },
    ];
    
    const votes = [
      { participantId: '1', value: 5 },
    ];
    
    const originalEstimate = 5;

    await processWinStreaks({ participants, votes, originalEstimate });

    expect(mockUpdateParticipant).toHaveBeenCalledWith('1', { winStreak: 3 });
    expect(mockUpdateParticipant).not.toHaveBeenCalledWith('2', expect.anything());
  });

  it('should not update participants whose streak does not change', async () => {
    const participants = [
      { id: '1', winStreak: 0 },
    ];
    
    const votes = [
      { participantId: '1', value: 3 },
    ];
    
    const originalEstimate = 5;

    await processWinStreaks({ participants, votes, originalEstimate });

    expect(mockUpdateParticipant).not.toHaveBeenCalled();
  });

  it('should handle participants with undefined winStreak', async () => {
    const participants = [
      { id: '1', winStreak: undefined },
    ];
    
    const votes = [
      { participantId: '1', value: 5 },
    ];
    
    const originalEstimate = 5;

    await processWinStreaks({ participants, votes, originalEstimate });

    expect(mockUpdateParticipant).toHaveBeenCalledWith('1', { winStreak: 1 });
  });
});