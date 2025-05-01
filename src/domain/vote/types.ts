import { type z } from "zod";
import { type VoteSchema } from "./schemas";

export type Vote = z.infer<typeof VoteSchema>;
