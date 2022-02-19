import type { NextPage } from "next";

import { useAuthContext } from "global/context/AuthContext";
import { TodoPage } from "./components/TodoPage";
import { LandingPage } from "./components/LandingPage";

export const HomePage: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoPage /> : <LandingPage />}</>;
};
