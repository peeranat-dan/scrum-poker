import { doc, updateDoc } from "firebase/firestore";

import { sessionsCollection } from "../firestore";
import { UpdateSessionSchema } from "./schemas";
import { type UpdateSessionInput } from "./types";
import { assertValid } from "@/shared/zod/utils";

export async function updateSession(input: UpdateSessionInput) {
  const { id, ...rest } = assertValid(UpdateSessionSchema, input);

  await updateDoc(doc(sessionsCollection, id), {
    ...rest,
  });
}
