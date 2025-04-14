import { useContext } from "react";
import { ParticipantContext } from "./participant-context";

export function useParticipant() {
  const context = useContext(ParticipantContext);

  if (!context) {
    throw new Error("useParticipant must be used within a ParticipantProvider");
  }

  return context;
}
