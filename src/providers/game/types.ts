import { type Card } from "@/types/card.types";
import { type Participant } from "@/types/participant.types";
import { type Round } from "@/types/round.types";
import { type Vote } from "@/types/vote.types";

export interface GameProviderProps {
  children: React.ReactNode;
  gameId: string;
}

export interface GameProviderState {
  cards: Card[];
  participants: (Participant & { vote: Vote["value"] })[];
  round: Round | undefined;
  vote: Vote | null | undefined;
  castVote: (value: number) => void;
  revealRound: () => void;
}
