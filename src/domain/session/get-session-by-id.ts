import { getSession } from "@/data/session/get-session";

export async function getSessionById(id: string) {
  const session = await getSession(id);

  return session;
}
