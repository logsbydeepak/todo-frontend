import Head from "next/head";
import { ButtonWithLink } from "../../components/Button";

import style from "./LandingPage.module.scss";

const LandingPage = () => (
  <>
    <Head>
      <title>TODO - Getting Started</title>
    </Head>
    <div className={style.container}>
      <h1>
        Finish Your Task with{" "}
        <span>
          TODO<span>.</span>
        </span>
      </h1>
      <ButtonWithLink href="/SignUp" />
    </div>
  </>
);

export default LandingPage;
