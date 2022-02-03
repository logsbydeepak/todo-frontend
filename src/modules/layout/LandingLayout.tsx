import { ButtonWithLInk } from "modules/components/Button";
import Head from "next/head";

import style from "styles/module/pages/Index.module.scss";

const LandingLayout = () => {
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

export default LandingLayout;
