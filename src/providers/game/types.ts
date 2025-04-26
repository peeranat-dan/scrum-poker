import { type Round } from "@/data/round/types";
import { type Vote } from "@/data/vote/types";
import { type Participant } from "@/domain/participant/types";
import { type Card } from "@/types/card.types";

export interface GameProviderProps {
  children: React.ReactNode;
  gameId: string;
}

export interface GameProviderState {
  cards: Card[];
  participants: (Participant & { vote: Vote["value"] | undefined })[];
  round: Round | undefined;
  vote: Vote | null | undefined;
  castVote: (value: number) => void;
  revealRound: () => void;
  startNewRound: () => void;
}
