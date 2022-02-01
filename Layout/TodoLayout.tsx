import { useEffect, useReducer } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Loading from "components/Loading";
import PageTitle from "components/PageTitle";
import { ButtonIcon } from "components/Button";

import TodoItem from "components/Todo/TodoItem";
import TodoMenu from "components/Todo/TodoMenu";
import TodoCreate from "components/Todo/TodoCreate";

import { APIRequest } from "helper/APIRequest";
import { todoReducer } from "reducer/todoReducer";
import { useAuthContext } from "context/AuthContext";
import { TodoStateType } from "types/todoReducerType";

import style from "styles/module/pages/Index.module.scss";
import { useNotificationContext } from "context/NotificationContext";

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
  const router = useRouter();
  const { dispatchNotification } = useNotificationContext();

  const getTodo = async () => {
    const response = await APIRequest(
      "GET",
      `/todo?status=${todoState.activeMenu}&skip=${0}&limit=5`,
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

  const getMoreTodo = async (skip: number) => {
    dispatchTodoAction({
      type: "LOAD_MORE",
      isLoadingMore: true,
    });

    const response = await APIRequest(
      "GET",
      `/todo?status=${todoState.activeMenu}&skip=${skip}&limit=5`,
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

  const { changeAuth } = useAuthContext();

  useEffect(() => {
    dispatchTodoAction({
      type: "EMPTY_TODO",
    });

    dispatchTodoAction({
      type: "LOADING",
      isLoading: true,
    });

    getTodo();
  }, [todoState.activeMenu]);

  const handleAddTask = () => {};

  const handleChangeStatus = () => {};

  const handleChangeTask = () => {};

  const handleInputChange = () => {};

  const handleRemoveTask = () => {};

  const loadMoreHandle = async () => {
    getMoreTodo(todoState.todo.length);
  };

  return (
    <>
      <Head>
        <title>TODO - Get work done</title>
      </Head>
      <PageTitle title="Your Todos" subtitle="Manage your task" />
      <TodoCreate handleAddTask={handleAddTask} />
      <TodoMenu dispatchTodoAction={dispatchTodoAction} todoState={todoState} />
      {todoState.isLoading ? (
        <Loading />
      ) : (
        todoState.todo.map((task: any, index: number) => {
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
      {todoState.todo.length === 0 && (
        <p className={style.noTodo}>No task to show.</p>
      )}
      {todoState.showLoadMoreButton && todoState.todo.length !== 0 ? (
        <ButtonIcon
          icon="add"
          text="Load more"
          clickHandler={loadMoreHandle}
          loading={todoState.isLoadingMore}
        />
      ) : (
        <p className={style.noTodo}>
          {todoState.todo.length !== 0 && "No task left"}
        </p>
      )}
    </>
  );
};

export default TodoLayout;
