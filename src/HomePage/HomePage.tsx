import type { NextPage } from "next";

import { Navbar } from "AppPage/components/Navbar";
import { TodoPage } from "./components/TodoPage";
import { LandingPage } from "./components/LandingPage";

export const HomePage: NextPage<{ auth: boolean }> = ({ auth }) => (
  <>
    <Navbar auth={auth} />
    {auth ? <TodoPage /> : <LandingPage />}
  </>
);
