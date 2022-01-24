import { createContext } from "react";

export const AuthContext = createContext({
  auth: false,
  changeAuth: (value: boolean) => {},
});
