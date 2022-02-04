import { Dispatch, SetStateAction, useEffect, useReducer } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "modules/common/PageTitle";
import { ButtonWithTextAndIcon } from "modules/common/Button";

import TodoItem from "modules/layout/components/TodoItem";
import TodoMenu from "modules/layout/components/TodoMenu";
import TodoCreate from "modules/layout/components/TodoCreate";

import { apiRequest } from "helper/apiRequest.helper";
import { todoReducer } from "reducer/todo.reducer";
import { useAuthContext } from "modules/context/AuthContext";
import { TodoStateType, TodoType } from "types/todoReducerType";

import style from "styles/modules/layout/pages/Index.module.scss";
import { useNotificationContext } from "modules/context/NotificationContext";
import Spinner from "modules/common/Spinner";
import { handleDeleteTodo } from "handler/deleteTodo.handler";
import { useAPICall } from "helper/useFetch.helper";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

const TodoPageLayout = () => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    initialTodoState
  );

  const [setAPIRequestData] = useAPICall(null);

  const { todo, activeMenu, isLoading, isLoadingMore, showLoadMoreButton } =
    todoState;

  const router = useRouter();

  const { changeAuth } = useAuthContext();
  const { dispatchNotification } = useNotificationContext();

  const getTodo = async () => {
    const response = await apiRequest(
      "GET",
      `/todo?status=${activeMenu}&skip=${0}&limit=5`,
      changeAuth,
      router,
      dispatchNotification
    );

    if (!response) return;

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
    await apiRequest(
      "DELETE",
      `/todo?id=${id}`,
      changeAuth,
      router,
      dispatchNotification
    );

  const getMoreTodo = async (skip: number) => {
    dispatchTodoAction({
      type: "LOAD_MORE",
      isLoadingMore: true,
    });

    const response = await apiRequest(
      "GET",
      `/todo?status=${activeMenu}&skip=${skip}&limit=5`,
      changeAuth,
      router,
      dispatchNotification
    );

    if (!response) return;

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
    await apiRequest("PUT", "/todo", changeAuth, router, dispatchNotification, {
      id: data._id,
      status: data.status,
      task: data.task,
    });

  const handleChangeStatus = (
    index: number,
    setLoadingIcon: Dispatch<
      SetStateAction<{
        status: boolean;
        task: boolean;
        delete: boolean;
      }>
    >
  ) => {
    const indexTodo = todo[index];
    setAPIRequestData({
      data: {
        url: `/todo`,
        method: "PUT",
        data: {
          id: indexTodo._id,
          task: indexTodo.task,
          status: !indexTodo.status,
        },
      },
      response: {
        onSuccess: (response: any) => {
          setLoadingIcon((preValue) => ({ ...preValue, status: false }));
          dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
          dispatchNotification({ type: "SUCCESS", message: "Status changed" });
        },
        onError: () => {
          setLoadingIcon((preValue) => ({ ...preValue, status: false }));
        },
      },
    });
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
              handleRemoveTask={(index: number) =>
                handleDeleteTodo(
                  index,
                  changeAuth,
                  router,
                  dispatchNotification,
                  dispatchTodoAction,
                  todo
                )
              }
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

export default TodoPageLayout;
