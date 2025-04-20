import { z } from "zod";

export const votingSystemEnum = z.enum(["fibonacci", "t-shirt"]);
export type VotingSystem = z.infer<typeof votingSystemEnum>;
