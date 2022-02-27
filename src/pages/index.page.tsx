import { GetServerSideProps, NextPage } from "next";
import { Navbar } from "components/Navbar";
import { TodoPage, LandingPage } from "./Index/pages";

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: { auth: req.cookies.auth === "true" },
});

const Home: NextPage<{ auth: boolean }> = ({ auth }) => (
  <>
    <Navbar auth={auth} />
    {auth ? <TodoPage /> : <LandingPage />}
  </>
);

export default Home;
