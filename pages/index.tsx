import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/module/pages/Index.module.scss";
import { ButtonSimple } from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "helper/authContext";
import { axiosRequest } from "helper/axios";
import { captureRejectionSymbol } from "stream";
import Router, { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { APIRequest } from "helper/APIRequest";
import { json } from "stream/consumers";
import TodoMenu from "components/TodoMenu";

import CreateTaskInput from "components/CreateTaskInput";

const Home: NextPage = () => {
  const [todo, setTodo] = useState([]);
  const { auth, changeAuth } = useContext(AuthContext);

  const router = useRouter();

  const getTodo = async () => {
    const request = await APIRequest(
      "GET",
      "/todo?status=false&page=0",
      changeAuth,
      router
    );
    setTodo(request);
  };

  useEffect(() => {
    if (!auth) return;
    // getTodo();
  }, [auth]);

  return (
    <>
      {auth ? (
        <>
          <CreateTaskInput loading={false} />
          <TodoMenu />
        </>
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
