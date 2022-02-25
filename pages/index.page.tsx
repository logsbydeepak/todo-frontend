import HomePage from "HomePage";
import { GetServerSideProps, NextPage } from "next";

const Home: NextPage<{ auth: boolean }> = (props) => (
  <HomePage auth={props.auth} />
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: { auth: req.cookies.auth === "true" },
});

export default Home;
