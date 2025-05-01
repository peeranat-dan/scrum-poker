import { getSession } from "@/data/session/get-session";
import { updateSession } from "@/data/session/update-session";

import { checkIfUserCanManageSession } from "./access-control";

export async function terminateSession(sessionId: string) {
  const session = await getSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  checkIfUserCanManageSession(session.id);

  await updateSession(sessionId, {
    status: "finished",
  });
}
