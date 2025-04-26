import { getParticipant } from "@/data/participant/get-participant";

export async function getParticipantById(id: string) {
  const participant = await getParticipant(id);

  return participant;
}
