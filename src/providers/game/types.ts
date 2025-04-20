import { type Participant } from "@/data/participant/types";
import { type Round } from "@/data/round/types";
import { type Card } from "@/types/card.types";

import { type Vote } from "@/types/vote.types";

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
