import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type AuthContext = {
  auth: boolean;
  changeAuth: (value: boolean) => void;
} | null;

export const AuthContext = createContext<AuthContext>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("out of context");
  }

  return context;
};

const myUseLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const AuthProvider: FunctionComponent = ({ children }) => {
  const [auth, setAuth] = useState(false);

  myUseLayoutEffect(() => {
    const initialAuth = localStorage.getItem("auth");
    if (initialAuth === null) {
      localStorage.setItem("auth", "false");
    }
    setAuth(localStorage.getItem("auth") === "true");
  });

  const changeAuth = (value: boolean) => {
    setAuth(value);
    localStorage.setItem("auth", value.toString());
  };

  return (
    <>
      <AuthContext.Provider value={{ auth, changeAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
