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
import PageTitle from "components/PageTitle";
import TaskInput from "components/TaskInput";

const Home: NextPage = () => {
  const [todo, setTodo] = useState([]);
  const { auth, changeAuth } = useContext(AuthContext);
  const [status, changeStatus] = useState(false);
  const [edit, setEdit] = useState(false);

  const [active, setActive] = useState("all");
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

  const handleChangeStatus = (e: any) => {
    e.preventDefault();
    changeStatus(!status);
  };

  useEffect(() => {
    if (!auth) return;
    // getTodo();
  }, [auth]);

  return (
    <>
      {auth ? (
        <>
          <PageTitle title="Your Todos" subtitle="Manage your task" />
          <CreateTaskInput loading={false} />
          <TodoMenu active={active} setActive={setActive} />
          <TaskInput
            status={status}
            task="task 1"
            edit={edit}
            handleChangeStatus={handleChangeStatus}
            onEditHandle={() => setEdit(!edit)}
          />
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
