import { type FirestoreDoc, type FirestoreSearchInput } from '@/shared/firestore/types';

export type RoundStatus = 'in-progress' | 'revealed' | 'finished';

export interface BaseRoundDoc {
  sessionId: string;
  status: RoundStatus;
  averageVote: number | null;
  // NOTE: Optional because rounds created before issue ids were added do not have it
  issueId?: string | null;
}

export type RoundDoc = Prettify<FirestoreDoc<BaseRoundDoc>>;

export type AddRoundInput = BaseRoundDoc;

export type UpdateRoundInput = Partial<BaseRoundDoc>;

export type FilterRoundInput = Partial<BaseRoundDoc>;

export type SearchRoundInput = Prettify<FirestoreSearchInput<RoundDoc>>;

export type FindRoundInput = Omit<SearchRoundInput, 'paging'>;
