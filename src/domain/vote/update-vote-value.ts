import { getVote } from "@/data/vote/get-vote";
import { updateVote } from "@/data/vote/update-vote";
import { assertValid } from "@/shared/zod/utils";
import { UpdateVoteValueSchema } from "./schemas";
import { type UpdateVoteValueInput } from "./types";

export async function updateVoteValue(input: UpdateVoteValueInput) {
  const { id, value } = assertValid(UpdateVoteValueSchema, input);

  const vote = await getVote(id);

  if (!vote) {
    throw new Error("Vote not found");
  }

  await updateVote(id, { value });
}
