import type { NextPage } from "next";

import { useAuthContext } from "lib/context/AuthContext";
import TodoPageLayout from "components/layouts/TodoPageLayout";
import LandingPageLayout from "components/layouts/LandingPageLayout";

const Home: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoPageLayout /> : <LandingPageLayout />}</>;
};

export default Home;
