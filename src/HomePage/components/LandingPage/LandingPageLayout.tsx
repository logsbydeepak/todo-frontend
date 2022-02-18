import { ButtonWithLink } from "HomePage/components/ButtonWithLink";

import Head from "next/head";
import style from "./landingPage.layout.module.scss";

const LandingPageLayout = () => {
  return (
    <>
      <Head>
        <title>TODO - Getting Started</title>
      </Head>
      <div className={style.base}>
        <h1 className={style.title}>
          Finish Your Task with{" "}
          <span>
            TODO<span>.</span>
          </span>
        </h1>
        <ButtonWithLink href="/SignUp" />
      </div>
    </>
  );
};

export default LandingPageLayout;
