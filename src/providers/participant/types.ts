import { type Participant } from "@/types/participant.types";

export interface ParticipantProviderProps {
  children: React.ReactNode;
  sessionId: string;
  uid: string;
}

export interface ParticipantProviderState {
  participant: Participant | null | undefined;
  updateParticipantName: (name: string) => Promise<void>;
}
