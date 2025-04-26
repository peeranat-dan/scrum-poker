import { type Participant } from "@/domain/participant/types";
import { type Vote } from "@/domain/vote/types";

export function mapper(
  participants: (Participant & { vote: Vote["value"] | undefined })[]
) {
  return participants.map((participant) => ({
    id: participant.id,
    name: participant.displayName,
    updatedAt: participant.updatedAt.toLocaleString(),
    role: participant.role,
    voted: typeof participant.vote === "number",
  }));
}
