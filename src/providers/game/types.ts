import { type Card } from "@/types/card.types";
import { type Participant } from "@/types/participant.types";
import { type Session } from "@/types/session.types";

export interface GameProviderProps {
  children: React.ReactNode;
  gameId: string;
}

export interface GameProviderState {
  session: Session | undefined;
  loading: boolean;
  cards: Card[];
  playerInfo: Participant | undefined;
  updatePlayerName: (name: string) => void;
}
