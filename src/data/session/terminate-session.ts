import { getSessionById } from "./get-session-by-id";
import { updateSession } from "./update-session";

export async function terminateSession(sessionId: string) {
  const session = await getSessionById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  await updateSession({
    id: session.id,
    status: "finished",
    finishedAt: new Date(),
  });
}
