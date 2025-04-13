import { type ParticipantDoc } from "@/types/participant.types";
import { type SessionDoc } from "@/types/session.types";
import { type VoteDoc } from "@/types/vote.types";
import {
  collection,
  type CollectionReference,
  type DocumentData,
  getFirestore,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

function createCollection<T = DocumentData>(collectionName: string) {
  return collection(db, collectionName) as CollectionReference<T>;
}

export const sessionsCollection = createCollection<SessionDoc>("sessions");
export const participantsCollection =
  createCollection<ParticipantDoc>("participants");
export const votesCollection = createCollection<VoteDoc>("votes");
