import { getParticipant } from "@/data/participant/get-participant";
import { updateParticipant } from "@/data/participant/update-participant";

export async function removeParticipant(id: string) {
  const participant = await getParticipant(id);

  if (!participant) {
    throw new Error("Participant not found");
  }

  if (participant.status === "removed") {
    throw new Error("Participant already removed");
  }

  await updateParticipant(id, {
    status: "removed",
  });
}
