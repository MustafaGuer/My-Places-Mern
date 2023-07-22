import { createContext } from "react";

export type AuthContextT = {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
  login: (uid: string, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextT>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: string, token: string) => {},
  logout: () => {},
});
