import type { NextPage } from "next";

import TodoLayout from "Layout/TodoLayout";
import LandingLayout from "Layout/LandingLayout";
import { useAuthContext } from "context/AuthContext";

const Home: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoLayout /> : <LandingLayout />}</>;
};

export default Home;
