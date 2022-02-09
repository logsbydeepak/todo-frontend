import Head from "next/head";
import { useEffect, useMemo, useReducer } from "react";

import PageTitle from "components/common/PageTitle";
import { ButtonWithTextAndIcon } from "components/common/Button";

import TodoItem from "../elements/TodoItemElement";
import TodoMenu from "../elements/TodoMenuLayoutElement";
import TodoCreate from "../elements/TodoCreateElement";

import { todoReducer } from "lib/reducer/todo.reducer";
import { TodoStateType, TodoType } from "types/todoReducerType";

import Spinner from "components/common/Spinner";
import { useAPICall } from "lib/helper/useAPICall.helper";
import { handleGetMoreTodo } from "lib/handler/loadMoreTodo.handler";
import { useNotificationContext } from "lib/context/NotificationContext";
import { handleGetTodoOnMenuChange } from "lib/handler/getTodoOnMenuChange.handler";

import style from "./styles/todoPage.layout.module.scss";
import { useAuthContext } from "lib/context";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

const TodoPageLayout = () => {
  const { auth } = useAuthContext();
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
  const ab = "hi";
  console.log("hi");
  useEffect(() => {
    if (!auth) return;
    useMemoHandleGetTodoOnMenuChange;
  }, [auth]);

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
