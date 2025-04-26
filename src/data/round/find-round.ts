import { buildQueryConstraints } from "@/shared/firestore/utils";
import { getDocs, query } from "firebase/firestore";
import { roundsCollection } from "../firestore";
import { roundMapper } from "./mapper";
import { type FindRoundInput } from "./types";

export async function findRound(input: FindRoundInput) {
  const constraints = buildQueryConstraints({
    filter: input.filter,
    order: input.order,
    paging: {
      limit: 1,
    },
  });

  const q = query(roundsCollection, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.empty ? undefined : roundMapper.toRound(snapshot.docs[0]);
}
