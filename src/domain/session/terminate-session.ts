import { getSession } from "@/data/session/get-session";
import { updateSession } from "@/data/session/update-session";

export async function terminateSession(sessionId: string) {
  const session = await getSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  await updateSession(sessionId, {
    status: "finished",
  });
}
