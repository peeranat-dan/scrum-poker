import { type Timestamp } from "firebase/firestore";

type VotingSystem = "fibonacci" | "t-shirt";
type SessionStatus = "active" | "finished";

export interface Session {
  id: string;
  createdAt: Date;
  name: string;
  votingSystem: VotingSystem;
  status: SessionStatus;
  finishedAt?: Date;
}

export interface SessionDoc {
  createdAt: Timestamp;
  name: string;
  votingSystem: VotingSystem;
  status: SessionStatus;
  finishedAt?: Timestamp;
}

export interface UpdateSessionInput {
  id: string;
  name?: string;
  votingSystem?: VotingSystem;
  status?: SessionStatus;
  finishedAt?: Date;
}
