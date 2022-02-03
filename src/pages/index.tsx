import type { NextPage } from "next";

import TodoLayout from "modules/layout/page/TodoLayoutPage";
import LandingLayout from "modules/layout/page/LandingPageLayout";
import { useAuthContext } from "modules/context/AuthContext";

const Home: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoLayout /> : <LandingLayout />}</>;
};

export default Home;
