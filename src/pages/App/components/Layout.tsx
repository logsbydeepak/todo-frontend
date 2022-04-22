import { Navbar } from "components/Navbar";
import { useAuthContext } from "context/AuthContext";
import { FC, useEffect, useState } from "react";

const Layout: FC = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (isAuth === null) return;
    setIsAppReady(true);
  }, [isAuth]);

  if (!isAppReady) return null;

  return (
    <>
      <Navbar auth={isAuth} />
      {children}
    </>
  );
};

export default Layout;
