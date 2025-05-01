import { getRound } from "@/data/round/get-round";
import { addVote } from "@/data/vote/add-vote";
import { canCastVote } from "@/domain/vote/rules";
import { assertValid } from "@/shared/zod/utils";
import { CastVoteSchema } from "./schemas";
import { type CastVoteInput } from "./types";

export async function castVote(input: CastVoteInput) {
  const { participantId, roundId, value } = assertValid(CastVoteSchema, input);

  const round = await getRound(roundId);

  canCastVote(round);

  const vote = addVote({
    participantId,
    roundId,
    value,
  });

  return vote;
}
