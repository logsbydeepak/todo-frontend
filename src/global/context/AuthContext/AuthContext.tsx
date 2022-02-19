import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { AuthContextType } from "./types";

export const AuthContext = createContext<AuthContextType>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  myUseLayoutEffect(() => {
    setAuth(localStorage.getItem("auth") === "true");
  }, []);

  const changeAuth = (value: boolean) => {
    if (value) {
      localStorage.setItem("auth", value.toString());
    } else {
      localStorage.clear();
    }
    setAuth(value);
  };

  return (
    <>
      <AuthContext.Provider value={{ auth, changeAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
