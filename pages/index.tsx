import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import Loading from "components/Loading";
import TodoMenu from "components/TodoMenu";
import PageTitle from "components/PageTitle";
import TaskInput from "components/TaskInput";
import { ButtonSimple } from "components/Button";
import { ButtonIcon } from "components/Button";
import CreateTaskInput from "components/CreateTaskInput";

import { APIRequest } from "helper/APIRequest";
import { AuthContext } from "helper/authContext";

import landingPageStyle from "styles/module/pages/Index.module.scss";

const Home: NextPage = () => {
  const [todo, setTodo] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoadMoreButton, setIsLoadMoreButton] = useState(false);

  const { auth, changeAuth } = useContext(AuthContext);
  const [skip, setSkip] = useState(0);

  const [active, setActive] = useState("false");
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

  const handleChangeStatus = (id: any, loading: any, setLoading: any) => {
    const newTodo = [...todo];
    newTodo[id].status = !newTodo[id].status;
    setTodo([...newTodo]);
    setLoading({ ...loading, status: false });
  };

  const handleRemoveTask = (e: any, id: any, loading: any, setLoading: any) => {
    e.preventDefault();
    const newTodo = todo.filter((task: number, index: number) => index !== id);
    setTodo(newTodo);
    setLoading({ ...loading, delete: false });
  };

  useEffect(() => {
    if (!auth) return;
    getTodo();
  }, [auth, skip, active]);

  const loadMoreHandle = (e: any) => {
    console.log("hi");
    e.preventDefault();
    setSkip(todo.length);
  };

  const handleInputChange = (e: any, index: any) => {
    const newTodo = [...todo];
    console.log(e.target.value);
    newTodo[index].task = e.target.value;
    setTodo(newTodo);
  };

  const handleChangeTask = (
    e: any,
    index: any,
    loading: any,
    setLoading: any,
    setTick: any
  ) => {
    e.preventDefault();
    setTick(false);
    setLoading({ ...loading, task: false });
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
            todo.map((task: any, index: number) => {
              return (
                <TaskInput
                  key={task._id}
                  index={index}
                  status={task.status}
                  task={task.task}
                  handleChangeStatus={handleChangeStatus}
                  handleInputChange={handleInputChange}
                  handleRemoveTask={handleRemoveTask}
                  handleChangeTask={handleChangeTask}
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
