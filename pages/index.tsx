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
  const [todo, setTodo] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [status, changeStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [loadMore, setLoadMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoadMoreButton, setIsLoadMoreButton] = useState(false);

  const { auth, changeAuth } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);

  const [active, setActive] = useState("all");
  const router = useRouter();

  const getTodo = async () => {
    setLoading(true);
    const request: any = await APIRequest(
      "GET",
      `/todo?status=${active}&skip=${skip}&limit=5`,
      changeAuth,
      router
    );

    if (request.length < 5) {
      setIsLoadMoreButton(false);
    } else {
      setIsLoadMoreButton(true);
    }

    setTodo([...todo, ...request]);
    setLoading(false);
  };

  const handleChangeStatus = (e: any) => {
    e.preventDefault();
    changeStatus(!status);
  };

  useEffect(() => {
    if (!auth) return;
    getTodo();
  }, [auth, skip, active]);

  const loadMoreHandle = (e: any) => {
    e.preventDefault();
    setSkip(todo.length);
  };

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      {auth ? (
        <>
          <PageTitle title="Your Todos" subtitle="Manage your task" />
          <CreateTaskInput loading={false} />
          <TodoMenu
            active={active}
            setActive={setActive}
            setSkip={setSkip}
            setTodo={setTodo}
          />
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
          {todo.length === 0 && (
            <p className={landingPageStyle.noTodo}>No task to show.</p>
          )}
          {isLoadMoreButton && todo.length !== 0 ? (
            <ButtonIcon
              icon="add"
              text="Load more"
              type="primary"
              clickHandler={loadMoreHandle}
              loading={loadingMore}
            />
          ) : (
            <p className={landingPageStyle.noTodo}>
              {todo.length !== 0 && "No task left"}
            </p>
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
