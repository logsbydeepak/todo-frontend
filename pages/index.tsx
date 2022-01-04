import Link from "next/link";
import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/Landing.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TODO - Getting Started</title>
      </Head>
      <div className={landingPageStyle.base}>
        <h1 className={landingPageStyle.title}>Finish Your Task with TODO</h1>
        <Link href="/SignUp">
          <a className={landingPageStyle.btn}>Get Started</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
