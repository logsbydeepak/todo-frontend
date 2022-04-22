import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = null | {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuthContext = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("Out of context");
  }

  return value;
};

export const AuthProvider: FC = ({ children }) => {
  const [isAuth, changeIsAuth] = useState(false);

  const setIsAuth = (auth: boolean) => {
    changeIsAuth(() => {
      if (auth) {
        localStorage.setItem("auth", auth.toString());
      } else {
        localStorage.removeItem("auth");
      }

      return auth;
    });
  };
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    changeIsAuth(localAuth === "true");
  }, []);

  const memoValue = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
