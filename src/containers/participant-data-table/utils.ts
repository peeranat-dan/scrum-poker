import { type Participant } from "@/types/participant.types";
import { type Vote } from "@/types/vote.types";

export function mapper(
  participants: (Participant & { vote: Vote["value"] | undefined })[]
) {
  return participants.map((participant) => ({
    id: participant.id,
    name: participant.displayName,
    joinedAt: participant.joinedAt.toLocaleString(),
    voted: typeof participant.vote === "number",
  }));
}
