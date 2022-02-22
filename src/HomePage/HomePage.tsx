import type { NextPage } from "next";

import { TodoPage } from "./components/TodoPage";
import { LandingPage } from "./components/LandingPage";
import { Navbar } from "AppPage/components/Navbar";

export const HomePage: NextPage<{ auth: boolean }> = ({ auth }) => {
  return (
    <>
      <Navbar auth={auth} />
      {auth ? <TodoPage /> : <LandingPage />}
    </>
  );
};
