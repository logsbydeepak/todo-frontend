import HomePage from "HomePage";
import { NextPage } from "next";
import { NextRequest } from "next/server";

const Home: NextPage<{ auth: boolean }> = ({ auth }) => (
  <HomePage auth={auth} />
);

export const getServerSideProps = ({ req }: { req: NextRequest }) => {
  return { props: { auth: req.cookies.auth === "true" } };
};

export default Home;
