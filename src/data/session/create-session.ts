import { type CreateSessionInput } from "@/types/schema.types";
import { addDoc, Timestamp } from "firebase/firestore";

import { sessionsCollection } from "../firestore";

export async function createSession(input: CreateSessionInput) {
  const session = await addDoc(sessionsCollection, {
    createdAt: Timestamp.now(),
    name: input.name,
    votingSystem: input.votingSystem,
    status: "active",
  });

  return session;
}
