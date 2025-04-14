import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyJoinLink(sessionId: string) {
  try {
    const joinLink = `${window.location.origin}/join/${sessionId}`;
    await navigator.clipboard.writeText(joinLink);
  } catch (error) {
    console.error("Failed to copy join link:", error);
  }
}
