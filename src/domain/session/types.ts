import { type z } from "zod";
import { type SessionSchema } from "./schemas";

export type Session = z.infer<typeof SessionSchema>;
