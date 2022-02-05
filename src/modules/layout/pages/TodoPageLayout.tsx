import { Dispatch, SetStateAction, useEffect, useReducer } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import PageTitle from "modules/common/PageTitle";
import { ButtonWithTextAndIcon } from "modules/common/Button";

import TodoItem from "modules/layout/components/TodoItemLayoutComponent";
import TodoMenu from "modules/layout/components/TodoMenuLayoutComponent";
import TodoCreate from "modules/layout/components/TodoCreateLayoutComponent";

import { apiRequest } from "helper/apiRequest.helper";
import { todoReducer } from "reducer/todo.reducer";
import { useAuthContext } from "modules/context/AuthContext";
import { TodoStateType, TodoType } from "types/todoReducerType";

import style from "styles/modules/layout/pages/Index.module.scss";
import { useNotificationContext } from "modules/context/NotificationContext";
import Spinner from "modules/common/Spinner";
import { useAPICall } from "helper/useAPICall.helper";
import { handleGetTodoOnMenuChange } from "handler/getTodoOnMenuChange.handler";
import { handleGetMoreTodo } from "handler/loadMoreTodo.handler";

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

  useEffect(() => {
    handleGetTodoOnMenuChange(
      setAPIRequestData,
      dispatchTodoAction,
      activeMenu
    );
  }, [activeMenu]);

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
              dispatchTodoAction={dispatchTodoAction}
              todo={todo}
            />
          );
        })
      )}
      {todo.length === 0 && <p className={style.noTodo}>No task to show</p>}

      {showLoadMoreButton && (
        <ButtonWithTextAndIcon
          icon="add"
          text="Load more"
          clickHandler={() =>
            handleGetMoreTodo(
              dispatchTodoAction,
              setAPIRequestData,
              activeMenu,
              todo.length,
              dispatchNotification
            )
          }
          loading={isLoadingMore}
        />
      )}
    </>
  );
};

export default TodoPageLayout;
