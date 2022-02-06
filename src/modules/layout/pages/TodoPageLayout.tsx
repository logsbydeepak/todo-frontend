import Head from "next/head";
import { useEffect, useMemo, useReducer } from "react";

import PageTitle from "modules/common/PageTitle";
import { ButtonWithTextAndIcon } from "modules/common/Button";

import TodoItem from "modules/layout/components/TodoItemLayoutComponent";
import TodoMenu from "modules/layout/components/TodoMenuLayoutComponent";
import TodoCreate from "modules/layout/components/TodoCreateLayoutComponent";

import { todoReducer } from "reducer/todo.reducer";
import { TodoStateType, TodoType } from "types/todoReducerType";

import Spinner from "modules/common/Spinner";
import { useAPICall } from "helper/useAPICall.helper";
import { handleGetMoreTodo } from "handler/loadMoreTodo.handler";
import { useNotificationContext } from "modules/context/NotificationContext";
import { handleGetTodoOnMenuChange } from "handler/getTodoOnMenuChange.handler";

import style from "styles/modules/layout/pages/TodoPageLayout.module.scss";

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

  const { todo, activeMenu, isLoading, isLoadingMore, showLoadMoreButton } =
    todoState;

  const [setAPIRequestData] = useAPICall(null);
  const { dispatchNotification } = useNotificationContext();

  const useMemoHandleGetTodoOnMenuChange = useMemo(() => {
    handleGetTodoOnMenuChange(
      setAPIRequestData,
      dispatchTodoAction,
      activeMenu
    );
  }, [activeMenu]);

  useEffect(() => {
    useMemoHandleGetTodoOnMenuChange;
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
        <div className={style.spinner}>
          <Spinner className={style.spinner__container} />
        </div>
      ) : (
        todo.map((todoItem: TodoType, index: number) => {
          return (
            <TodoItem
              index={index}
              key={todoItem._id}
              todoItem={todoItem}
              dispatchTodoAction={dispatchTodoAction}
              setAPIRequestData={setAPIRequestData}
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
