import Link from "next/link";
import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/Landing.module.scss";
import { ButtonSimple } from "../components/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO - Getting Started</title>
      </Head>
      <div className={landingPageStyle.base}>
        <h1 className={landingPageStyle.title}>Finish Your Task with TODO</h1>
        <ButtonSimple link="/SignUp" />
      </div>
    </>
  );
};

export default Home;
