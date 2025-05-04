import { createContext } from 'react';
import { type AuthProviderState } from './types';

export const AuthContext = createContext<AuthProviderState | undefined>(undefined);
