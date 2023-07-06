import { createContext } from "react";

export type AuthContextT = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextT>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
