import { type ParticipantDoc } from "@/types/participant.types";
import { type RoundDoc } from "@/types/round.types";
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

const participantsCollection = createCollection<ParticipantDoc>("participants");
const roundsCollection = createCollection<RoundDoc>("rounds");
const sessionsCollection = createCollection<SessionDoc>("sessions");
const votesCollection = createCollection<VoteDoc>("votes");

export {
  participantsCollection,
  roundsCollection,
  sessionsCollection,
  votesCollection,
};
