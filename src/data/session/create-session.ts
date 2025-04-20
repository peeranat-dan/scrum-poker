import { addDoc, serverTimestamp } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { CreateSesionSchema } from "./schemas";
import { type CreateSessionInput } from "./types";

export async function createSession(_input: CreateSessionInput) {
  const input = CreateSesionSchema.parse(_input);

  const session = await addDoc(sessionsCollection, {
    createdAt: serverTimestamp(),
    name: input.name,
    votingSystem: input.votingSystem,
    status: "active",
    ownerId: input.ownerId,
  });

  return session;
}
