import { type z } from "zod";
import { type RoundSchema } from "./schemas";

export type Round = z.infer<typeof RoundSchema>;
