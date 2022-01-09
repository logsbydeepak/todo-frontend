import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/module/pages/Index.module.scss";
import { ButtonSimple } from "../components/Button";
import { useState } from "react";
import axios from "@config/axios";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useState(async () => {
    try {
      const request = await axios.get("/todo?status=true&page=0");
      setIsLogin(true);
      console.log(request);
    } catch (e: any) {
      console.log(e.response.data);
    }
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
