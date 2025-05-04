import { type FirestoreDoc, type FirestoreSearchInput } from '@/shared/firestore/types';

export interface BaseVoteDoc {
  roundId: string;
  participantId: string;
  value: number;
}

export type VoteDoc = Prettify<FirestoreDoc<BaseVoteDoc>>;

export type AddVoteInput = BaseVoteDoc;

export type UpdateVoteInput = Partial<BaseVoteDoc>;

export type SearchVoteInput = Prettify<FirestoreSearchInput<VoteDoc>>;

export type FindVoteInput = Omit<SearchVoteInput, 'paging'>;
