import { type CreateSessionInput } from "@/types/schema.types";
import { addDoc, Timestamp } from "firebase/firestore";

import { sessionsCollection } from "../firestore";

// TODO: ownerId is not in the form, but it should be in the input
export async function createSession(
  input: CreateSessionInput & { ownerId: string }
) {
  const session = await addDoc(sessionsCollection, {
    createdAt: Timestamp.now(),
    name: input.name,
    votingSystem: input.votingSystem,
    status: "active",
    ownerId: input.ownerId,
  });

  return session;
}
