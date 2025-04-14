import { type Vote } from "@/types/vote.types";
import { onSnapshot, query, where } from "firebase/firestore";
import { votesCollection } from "../firestore";
import { voteConverter } from "./firestore-converter";

export function streamVotes(
  roundId: string,
  callback: (votes: Vote[]) => void
) {
  const q = query(votesCollection, where("roundId", "==", roundId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const votes: Vote[] = [];

    // NOTE: forEach here is from querySnapshot, not from the forEach function in array
    // No need to convert to for const
    querySnapshot.forEach((doc) => {
      const vote = voteConverter(doc);
      votes.push(vote);
    });

    callback(votes);
  });

  return unsubscribe;
}
