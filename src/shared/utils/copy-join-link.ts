import { copyToClipboard } from "@/lib/clipboard";

export function buildJoinLink(sessionId: string) {
  return `${window.location.origin}/join/${sessionId}`;
}

export async function copyJoinLink(sessionId: string) {
  const link = buildJoinLink(sessionId);
  await copyToClipboard(link);
}
