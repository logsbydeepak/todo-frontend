import Head from "next/head";
import type { NextPage } from "next";

import landingPageStyle from "../styles/module/pages/Index.module.scss";
import { ButtonSimple } from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/auth.context";
import { axiosRequest } from "@config/axios";
import { captureRejectionSymbol } from "stream";
import Router, { useRouter } from "next/router";
import { route } from "next/dist/server/router";
import { APIRequest } from "helper/APIRequest";
import { json } from "stream/consumers";

const Home: NextPage = () => {
  const [todo, setTodo] = useState();
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

  const refreshToken = async () => {
    console.log(5);

    try {
      console.log(1);
      const request = await axiosRequest.put("/session/refresh");
      console.log(2);
      console.log(request);
      console.log(request.data.data);
    } catch (error: any) {
      console.log(3);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (!auth) return;
    // refreshToken();
    getTodo();
  }, [auth]);

  return (
    <>
      {auth ? (
        <h1>{JSON.stringify(todo)}</h1>
      ) : (
        // <h1>Todo</h1>
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
