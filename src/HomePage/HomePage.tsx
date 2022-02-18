import type { NextPage } from "next";

import { useAuthContext } from "global/context";
import TodoPageLayout from "./components/TodoPageLayout";
import LandingPageLayout from "./components/Layout/LandingPage/LandingPageLayout";

export const HomePage: NextPage = () => {
  const { auth } = useAuthContext();

  return <>{auth ? <TodoPageLayout /> : <LandingPageLayout />}</>;
};
