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

  const updateTask = async (taskData: any) => {
    await APIRequest("PUT", "/todo", changeAuth, router, {
      id: taskData._id,
      task: taskData.task,
      status: taskData.status,
    });
  };

  const handleChangeStatus = async (id: any, loading: any, setLoading: any) => {
    const newTodo = [...todo];
    let updateTaskData;

    newTodo[id].status = !newTodo[id].status;

    switch (active) {
      case "all":
        updateTaskData = newTodo;
        break;

      default:
        updateTaskData = todo.filter(
          (task: number, index: number) => index !== id
        );
        break;
    }

    await updateTask(newTodo[id]);
    setLoading({ ...loading, status: false });
    setTodo([...updateTaskData]);
  };

  const removeTask = async (id: any) => {
    await APIRequest("DELETE", `/todo?id=${id}`, changeAuth, router);
  };

  const handleRemoveTask = async (
    e: any,
    id: any,
    loading: any,
    setLoading: any
  ) => {
    e.preventDefault();
    let newTodo = [...todo];
    await removeTask(newTodo[id]._id);
    newTodo = todo.filter((task: number, index: number) => index !== id);
    setTodo(newTodo);
    setLoading({ ...loading, delete: false });
  };

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    getTodo();
    return () => {
      setTodo([]);
      setLoading(false);
    };
  }, [auth, skip, active]);

  const loadMoreHandle = (e: any) => {
    e.preventDefault();
    setSkip(todo.length);
  };

  const handleInputChange = (e: any, index: any) => {
    const newTodo = [...todo];
    newTodo[index].task = e.target.value;
    setTodo(newTodo);
  };

  const handleChangeTask = async (
    e: any,
    index: any,
    loading: any,
    setLoading: any,
    setTick: any
  ) => {
    e.preventDefault();
    const newTodo = [...todo];
    await updateTask(newTodo[index]);
    setTick(false);
    setLoading({ ...loading, task: false });
  };

  const handleAddTask = async (
    e: any,
    task: any,
    setTask: any,
    loading: any,
    setLoading: any
  ) => {
    e.preventDefault();
    const newTodo = [...todo];
    const request = await APIRequest("POST", "/todo", changeAuth, router, {
      task,
      status: false,
    });
    setTodo([
      { _id: request.id, task: request.task, status: request.status },
      ...newTodo,
    ]);
    setTask("");
    setLoading(false);
  };

  return (
    <>
      {auth ? (
        <>
          <PageTitle title="Your Todos" subtitle="Manage your task" />
          <CreateTaskInput handleAddTask={handleAddTask} />
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
