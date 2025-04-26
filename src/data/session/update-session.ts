import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { type UpdateSessionInput } from "./types";

export async function updateSession(id: string, input: UpdateSessionInput) {
  await updateDoc(doc(sessionsCollection, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}
