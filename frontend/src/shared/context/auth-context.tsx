import { createContext } from "react";

export type AuthContextT = {
  isLoggedIn: boolean;
  login: (uid: string) => void;
  logout: () => void;
  userId: string | null;
};

export const AuthContext = createContext<AuthContextT>({
  isLoggedIn: false,
  userId: null,
  login: (uid: string) => {},
  logout: () => {},
});
