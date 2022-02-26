import { GetServerSideProps, NextPage } from "next";
import { Navbar } from "AppPage/components/Navbar";
import { TodoPage } from "./Index/components/TodoPage";
import { LandingPage } from "./Index/components/LandingPage";

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: { auth: req.cookies.auth === "true" },
});

export const Home: NextPage<{ auth: boolean }> = ({ auth }) => (
  <>
    <Navbar auth={auth} />
    {auth ? <TodoPage /> : <LandingPage />}
  </>
);

export default Home;
