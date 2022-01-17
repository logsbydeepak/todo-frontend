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
import Loading from "components/Loading";
import { ButtonIcon } from "../components/Button";

const Home: NextPage = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, changeStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [loadMore, setLoadMore] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);

  const { auth, changeAuth } = useContext(AuthContext);

  const [active, setActive] = useState("all");
  const router = useRouter();

  const loadMoreHandle = (e: any) => {
    e.preventDefault();
    setLoadMore(loadMore + 2);
  };

  const getTodo = async () => {
    setLoading(true);
    const request: any = await APIRequest(
      "GET",
      `/todo?status=${active}&page=${loadMore}`,
      changeAuth,
      router
    );

    setTodo(request);

    setLoading(false);
  };

  const handleChangeStatus = (e: any) => {
    e.preventDefault();
    changeStatus(!status);
  };

  useEffect(() => {
    if (!auth) return;
    getTodo();
  }, [auth, active, loadMore]);

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
    getTodo();
  };

  return (
    <>
      {auth ? (
        <>
          <PageTitle title="Your Todos" subtitle="Manage your task" />
          <CreateTaskInput loading={false} />
          <TodoMenu active={active} setActive={setActive} />

          {loading ? (
            <Loading />
          ) : (
            todo.map((task: any) => {
              return (
                <TaskInput
                  key={task._id}
                  status={task.status}
                  task={task.task}
                  edit={edit}
                  handleChangeStatus={handleChangeStatus}
                  onEditHandle={() => setEdit(!edit)}
                  handleInputChange={handleInputChange}
                />
              );
            })
          )}
          {!loading && (
            <ButtonIcon
              icon="add"
              text="Load more"
              type="primary"
              clickHandler={loadMoreHandle}
              loading={loadingMore}
            />
          )}
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
