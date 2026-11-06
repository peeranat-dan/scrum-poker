import { type FirestoreDoc } from '@/shared/firestore/types';
import { type VotingSystem } from '@/shared/zod/enum';

interface BaseSessionDoc {
  name: string;
  votingSystem: VotingSystem;
  status: 'active' | 'finished';
  ownerId: string;
  // NOTE: Optional because sessions created before issue links were added do not have it
  issueTrackerUrl?: string | null;
}
export type SessionDoc = Prettify<FirestoreDoc<BaseSessionDoc>>;

export type AddSessionInput = Omit<SessionDoc, 'createdAt' | 'updatedAt'>;

export type UpdateSessionInput = Partial<SessionDoc>;
