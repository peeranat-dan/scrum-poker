import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomEmoji() {
  const emojis = ["🍰", "🧁", "🎂", "🍫"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
