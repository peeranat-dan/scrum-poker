import { createContext } from "react";
import { type SessionProviderState } from "./types";

export const SessionContext = createContext<SessionProviderState | undefined>(
  undefined
);
