import { type Participant } from '@/domain/participant/types';
import { type Round } from '@/domain/round/types';
import { type Vote } from '@/domain/vote/types';
import { type Card } from '@/shared/card/types';

export interface GameProviderProps {
  children: React.ReactNode;
  gameId: string;
}

interface ParticipantWithVote extends Participant {
  vote: Vote['value'] | undefined;
}

export interface GameProviderState {
  cards: Card[];
  participants: ParticipantWithVote[];
  round: Round | undefined;
  vote: Vote | null | undefined;
  castVote: (value: number) => void;
  revealRound: () => void;
  startNewRound: () => void;
}
