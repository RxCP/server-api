import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  authToken: '',
  setAuthToken: (token: string) => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}
