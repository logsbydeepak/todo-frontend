import { Dispatch, SetStateAction, useEffect, useReducer } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";

import TodoItem from "components/Todo/TodoItem";
import TodoMenu from "components/Todo/TodoMenu";
import TodoCreate from "components/Todo/TodoCreate";

import { APIRequest } from "helper/APIRequest";
import { todoReducer } from "reducer/todoReducer";
import { useAuthContext } from "context/AuthContext";
import { TodoStateType, TodoType } from "types/todoReducerType";

import style from "styles/module/pages/Index.module.scss";
import { useNotificationContext } from "context/NotificationContext";
import Spinner from "components/Spinner";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

const TodoLayout = () => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    initialTodoState
  );

  const { todo, activeMenu, isLoading, isLoadingMore, showLoadMoreButton } =
    todoState;

  const router = useRouter();

  const { changeAuth } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  const getTodo = async () => {
    const response = await APIRequest(
      "GET",
      `/todo?status=${activeMenu}&skip=${0}&limit=5`,
      changeAuth,
      router
    );

    dispatchTodoAction({
      type: "ADD_TODO_FROM_BOTTOM",
      todo: response,
    });

    dispatchTodoAction({
      type: "LOADING",
      isLoading: false,
    });
  };

  const removeTodo = async (id: string) =>
    await APIRequest("DELETE", `/todo?id=${id}`, changeAuth, router);

  const getMoreTodo = async (skip: number) => {
    dispatchTodoAction({
      type: "LOAD_MORE",
      isLoadingMore: true,
    });

    const response = await APIRequest(
      "GET",
      `/todo?status=${activeMenu}&skip=${skip}&limit=5`,
      changeAuth,
      router
    );

    dispatchTodoAction({
      type: "ADD_TODO_FROM_BOTTOM",
      todo: response,
    });

    dispatchTodoAction({
      type: "LOAD_MORE",
      isLoadingMore: false,
    });

    if (!(response.length >= 5)) {
      dispatchNotification({
        type: "SUCCESS",
        message: "No task left",
      });
    } else {
      dispatchNotification({
        type: "SUCCESS",
        message: "Task fetch successful",
      });
    }
  };

  useEffect(() => {
    dispatchTodoAction({
      type: "EMPTY_TODO",
    });

    dispatchTodoAction({
      type: "LOADING",
      isLoading: true,
    });

    getTodo();
  }, [activeMenu]);

  const updateTodo = async (data: {
    _id: string;
    task: string;
    status: boolean;
  }) =>
    await APIRequest("PUT", "/todo", changeAuth, router, {
      id: data._id,
      status: data.status,
      task: data.task,
    });

  const handleChangeStatus = async (
    index: number,
    setLoadingIcon: Dispatch<
      SetStateAction<{
        status: boolean;
        task: boolean;
        delete: boolean;
      }>
    >
  ) => {
    const cloneTodo = [...todo];
    await updateTodo({
      ...todo[index],
      status: !cloneTodo[index].status,
    });

    dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
    if (activeMenu === "all") {
      setLoadingIcon((preValue) => ({ ...preValue, status: false }));
    }
    dispatchNotification({ type: "SUCCESS", message: "Status changed" });
  };

  const handleChangeTask = async (
    index: number,
    setLoadingIcon: Dispatch<
      SetStateAction<{
        status: boolean;
        task: boolean;
        delete: boolean;
      }>
    >,
    setTick: Dispatch<SetStateAction<boolean>>,
    localTask: string
  ) => {
    await updateTodo({
      ...todo[index],
      task: localTask,
    });

    dispatchTodoAction({ type: "UPDATE_TODO_TASK", index, task: localTask });
    setLoadingIcon((preValue) => ({ ...preValue, task: false }));
    dispatchNotification({ type: "SUCCESS", message: "Task updated" });
    setTick(false);
  };

  const handleRemoveTask = async (
    index: number,
    setLoadingIcon: Dispatch<
      SetStateAction<{ status: boolean; task: boolean; delete: boolean }>
    >
  ) => {
    await removeTodo(todo[index]._id);
    dispatchTodoAction({
      type: "REMOVE_TODO",
      index,
    });
    dispatchNotification({ type: "SUCCESS", message: "Task removed" });
    // setLoadingIcon((preValue) => ({ ...preValue, delete: false }));
  };

  const loadMoreHandle = async () => {
    getMoreTodo(todo.length);
  };

  return (
    <>
      <Head>
        <title>TODO - Get work done</title>
      </Head>
      <PageTitle title="Your Todos" subtitle="Manage your task" />
      <TodoCreate dispatchTodoAction={dispatchTodoAction} />
      <TodoMenu
        dispatchTodoAction={dispatchTodoAction}
        activeMenu={activeMenu}
      />
      {isLoading ? (
        <div className={style.spinner__container}>
          <Spinner className={style.spinner} />
        </div>
      ) : (
        todo.map((task: TodoType, index: number) => {
          return (
            <TodoItem
              key={task._id}
              index={index}
              status={task.status}
              task={task.task}
              handleChangeStatus={handleChangeStatus}
              handleRemoveTask={handleRemoveTask}
              handleChangeTask={handleChangeTask}
            />
          );
        })
      )}
      {todo.length === 0 && <p className={style.noTodo}>No task to show</p>}

      {showLoadMoreButton && (
        <ButtonWithTextAndIcon
          icon="add"
          text="Load more"
          clickHandler={loadMoreHandle}
          loading={isLoadingMore}
        />
      )}
    </>
  );
};

export default TodoLayout;
