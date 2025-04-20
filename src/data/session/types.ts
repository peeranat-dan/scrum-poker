import { type VotingSystem } from "@/shared/zod/enum";
import { type z } from "zod";
import {
  type UpdateSessionInformationSchema,
  type CreateSesionSchema,
  type SessionSchema,
  type UpdateSessionSchema,
} from "./schemas";

export type Session = z.infer<typeof SessionSchema>;

export interface SessionDoc {
  createdAt: Date;
  name: string;
  votingSystem: VotingSystem;
  status: "active" | "finished";
  finishedAt?: Date;
  ownerId: string;
}

export type CreateSessionInput = z.infer<typeof CreateSesionSchema>;

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;

export type UpdateSessionInformationInput = z.infer<
  typeof UpdateSessionInformationSchema
>;
