/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextInterface>({
  login: () => {},
  storageId: null,
  logout: () => {},
  token: null,
});

export interface AuthContextInterface {
  login(userId: string, token: string, expirationDate?: string): void;
  storageId: string;
  logout(): void;
  token: string;
}
