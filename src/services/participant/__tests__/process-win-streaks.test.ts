import { describe, expect, it, vi } from 'vitest';
import { processWinStreaks } from '../process-win-streaks';

// Mock the dependencies
vi.mock('@/data/vote/search-votes');
vi.mock('@/data/participant/search-participants');
vi.mock('@/data/participant/get-participant');
vi.mock('../update-participant-streak');

import { getParticipant } from '@/data/participant/get-participant';
import { searchParticipants } from '@/data/participant/search-participants';
import { searchVotes } from '@/data/vote/search-votes';
import { updateParticipantStreak } from '../update-participant-streak';

const mockSearchVotes = vi.mocked(searchVotes);
const mockSearchParticipants = vi.mocked(searchParticipants);
const mockGetParticipant = vi.mocked(getParticipant);
const mockUpdateParticipantStreak = vi.mocked(updateParticipantStreak);

describe('processWinStreaks', () => {
  const roundId = 'round-123';
  const originalEstimate = 5;

  it('should increment streak for participants with correct votes', async () => {
    // Arrange
    const votes = [
      { participantId: 'participant-1', value: 5, roundId },
      { participantId: 'participant-2', value: 3, roundId },
    ];
    const participants = [
      { id: 'participant-1', status: 'active', role: 'player' },
      { id: 'participant-2', status: 'active', role: 'player' },
    ];

    mockSearchVotes.mockResolvedValue(votes as any);
    mockSearchParticipants.mockResolvedValue(participants as any);
    mockGetParticipant
      .mockResolvedValueOnce({ winStreak: 2 } as any)
      .mockResolvedValueOnce({ winStreak: 1 } as any);

    // Act
    await processWinStreaks(roundId, originalEstimate);

    // Assert
    expect(mockUpdateParticipantStreak).toHaveBeenCalledWith('participant-1', 3); // Increment from 2 to 3
    expect(mockUpdateParticipantStreak).toHaveBeenCalledWith('participant-2', 0); // Reset to 0
  });

  it('should reset streak for participants with incorrect votes', async () => {
    // Arrange
    const votes = [
      { participantId: 'participant-1', value: 3, roundId },
    ];
    const participants = [
      { id: 'participant-1', status: 'active', role: 'player' },
    ];

    mockSearchVotes.mockResolvedValue(votes as any);
    mockSearchParticipants.mockResolvedValue(participants as any);
    mockGetParticipant.mockResolvedValue({ winStreak: 5 } as any);

    // Act
    await processWinStreaks(roundId, originalEstimate);

    // Assert
    expect(mockUpdateParticipantStreak).toHaveBeenCalledWith('participant-1', 0);
  });

  it('should handle participants with no current streak', async () => {
    // Arrange
    const votes = [
      { participantId: 'participant-1', value: 5, roundId },
    ];
    const participants = [
      { id: 'participant-1', status: 'active', role: 'player' },
    ];

    mockSearchVotes.mockResolvedValue(votes as any);
    mockSearchParticipants.mockResolvedValue(participants as any);
    mockGetParticipant.mockResolvedValue({ winStreak: undefined } as any);

    // Act
    await processWinStreaks(roundId, originalEstimate);

    // Assert
    expect(mockUpdateParticipantStreak).toHaveBeenCalledWith('participant-1', 1); // 0 + 1
  });
});