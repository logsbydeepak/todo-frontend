import { NextPage } from "next";
import { useAuthContext } from "context/AuthContext";
import { TodoPage, LandingPage } from "./Index/pages";

const Home: NextPage<{ auth: boolean }> = () => {
  const { isAuth } = useAuthContext();

  if (!isAuth) return <LandingPage />;
  return <TodoPage />;
};

export default Home;
