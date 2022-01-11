import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/module/pages/Index.module.scss";
import { ButtonSimple } from "../components/Button";
import { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "context/auth.context";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    setIsLogin(auth);
  });

  return (
    <>
      {isLogin ? (
        <h1>Todo</h1>
      ) : (
        <>
          <Head>
            <title>TODO - Getting Started</title>
          </Head>
          <div className={landingPageStyle.base}>
            <h1 className={landingPageStyle.title}>
              Finish Your Task with TODO
            </h1>
            <ButtonSimple link="/SignUp" />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
