import type { NextPage } from "next";

import TodoLayout from "modules/layout/TodoLayout";
import LandingLayout from "modules/layout/LandingLayout";
import { useAuthContext } from "modules/context/AuthContext";

const Home: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoLayout /> : <LandingLayout />}</>;
};

export default Home;
