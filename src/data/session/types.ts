import { type VotingSystem } from "@/shared/zod/enum";
import { type Timestamp } from "firebase/firestore";
import { type z } from "zod";
import {
  type CreateSesionSchema,
  type SessionSchema,
  type UpdateSessionInformationSchema,
  type UpdateSessionSchema,
} from "./schemas";

export type Session = z.infer<typeof SessionSchema>;

export interface SessionDoc {
  createdAt: Timestamp;
  name: string;
  votingSystem: VotingSystem;
  status: "active" | "finished";
  finishedAt?: Timestamp;
  ownerId: string;
}

export type CreateSessionInput = z.infer<typeof CreateSesionSchema>;

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;

export type UpdateSessionInformationInput = z.infer<
  typeof UpdateSessionInformationSchema
>;
