import { type Timestamp } from "firebase/firestore";

type EstimationScale = "fibonacci" | "t-shirt";

export interface Session {
  id: string;
  createdAt: Date;
  createdBy: string;
  name: string;
  estimationScale: EstimationScale;
}

export interface SessionDoc {
  createdAt: Timestamp;
  createdBy: string;
  name: string;
  estimationScale: EstimationScale;
}
