import { getRound } from "@/data/round/get-round";
import { findVote } from "@/data/vote/find-vote";
import { castVote } from "./cast-vote";
import { type CastVoteInput } from "./types";
import { updateVoteValue } from "./update-vote-value";

export async function castOrUpdateVote(input: CastVoteInput) {
  const { participantId, roundId, value } = input;

  const existingVote = await findVote({
    filter: {
      roundId,
      participantId,
    },
  });
  const round = await getRound(roundId);

  if (round.status !== "in-progress") {
    throw new Error("Round is not in progress");
  }

  if (!existingVote) {
    await castVote(input);
  } else {
    await updateVoteValue({
      id: existingVote.id,
      value,
    });
  }
}
