import { createContext } from 'react';
import { type GameProviderState } from './types';

export const GameContext = createContext<GameProviderState | undefined>(undefined);
