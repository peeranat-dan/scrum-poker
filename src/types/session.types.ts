import { type Timestamp } from "firebase/firestore";

type VotingSystem = "fibonacci" | "t-shirt";

export interface Session {
  id: string;
  createdAt: Date;
  name: string;
  votingSystem: VotingSystem;
}

export interface SessionDoc {
  createdAt: Timestamp;
  name: string;
  votingSystem: VotingSystem;
}
