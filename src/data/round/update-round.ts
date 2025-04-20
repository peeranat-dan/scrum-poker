import { assertValid } from "@/shared/zod/utils";
import { doc, updateDoc } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { UpdateRoundSchema } from "./schemas";
import { type UpdateRoundInput } from "./types";

export async function updateRound(input: UpdateRoundInput) {
  const { id, ...rest } = assertValid(UpdateRoundSchema, input);

  await updateDoc(doc(roundsCollection, id), rest);
}
