import type { NextPage } from "next";

import { useAuthContext } from "modules/context/AuthContext";
import TodoPageLayout from "modules/layout/pages/TodoLayoutPage";
import LandingPageLayout from "modules/layout/pages/LandingPageLayout";

const Home: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoPageLayout /> : <LandingPageLayout />}</>;
};

export default Home;
