import type { NextPage } from "next";
import Link from "next/link";

import landingPageStyle from "../styles/Landing.module.scss";

const Home: NextPage = () => {
  return (
    <>
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
