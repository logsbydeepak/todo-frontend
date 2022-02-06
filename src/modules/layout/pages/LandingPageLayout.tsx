import { ButtonWithLInk } from "modules/common/Button";
import Head from "next/head";

import style from "styles/modules/layout/pages/LandingPageLayout.module.scss";

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
        <ButtonWithLInk link="/SignUp" />
      </div>
    </>
  );
};

export default LandingPageLayout;
