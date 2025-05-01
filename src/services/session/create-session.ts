import { addSession } from "@/data/session/add-session";
import { assertValid } from "@/shared/zod/utils";
import { CreateSessionSchema } from "./schemas";
import { type CreateSessionInput } from "./types";

export async function createSession(input: CreateSessionInput) {
  const validInput = assertValid(CreateSessionSchema, input);
  const session = await addSession(validInput);
  return session;
}
