import { type StartNewRoundInput } from "@/types/round.types";
import { doc, getDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { createRound } from "./create-round";
import { updateRound } from "./update-round";

export async function startNewRound(input: StartNewRoundInput) {
  const { sessionId, roundId } = input;

  const roundDoc = await getDoc(doc(roundsCollection, roundId));

  if (!roundDoc.exists()) {
    throw new Error("Round not found");
  }

  await updateRound({
    id: roundId,
    status: "finished",
    finishedAt: new Date(),
  });

  const nextRound = createRound(sessionId);

  return nextRound;
}
