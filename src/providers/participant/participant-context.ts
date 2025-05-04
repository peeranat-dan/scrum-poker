import { createContext } from 'react';
import { type ParticipantProviderState } from './types';

export const ParticipantContext = createContext<ParticipantProviderState | undefined>(undefined);
