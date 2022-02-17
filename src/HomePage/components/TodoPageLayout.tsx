import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useImmerReducer } from "use-immer";

import { PageTitle, ButtonWithTextAndIcon } from "global/components";

import TodoItem from "./TodoItemElement";
import TodoMenu from "./TodoMenuLayoutElement";
import TodoCreate from "./TodoCreateElement";

import { todoReducer } from "HomePage/todo.reducer";
import { TodoStateType, TodoType } from "global/reducer";

import { Spinner } from "global/components";
import { useAPICall } from "global/hooks";
import { handleGetMoreTodo } from "HomePage/handler/loadMore.todo.handler";
import { useNotificationContext } from "global/context";
import { handleGetTodoOnMenuChange } from "HomePage/handler/getOnMenuChange.todo.handler";

import style from "./styles/todoPage.layout.module.scss";
import { useAuthContext } from "global/context";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

const TodoPageLayout = () => {
  const { auth } = useAuthContext();
  const [todoState, dispatchTodoAction] = useImmerReducer(
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
    if (!auth) return;
    useMemoHandleGetTodoOnMenuChange;
  }, [auth]);

  return (
    <>
      <Head>
        <title>TODO - Get work done</title>
      </Head>
      <PageTitle title="Your Todo" subtitle="Manage your task" />
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
            <form key={todoItem._id}>
              <TodoItem
                index={index}
                todoItem={todoItem}
                dispatchTodoAction={dispatchTodoAction}
                setAPIRequestData={setAPIRequestData}
              />
            </form>
          );
        })
      )}
      {todo.length === 0 && <p className={style.noTodo}>No task to show</p>}

      {showLoadMoreButton && (
        <ButtonWithTextAndIcon
          icon="add"
          text="Load more"
          handleOnClick={() =>
            handleGetMoreTodo(
              dispatchTodoAction,
              setAPIRequestData,
              activeMenu,
              todo.length,
              dispatchNotification
            )
          }
          isLoading={isLoadingMore}
        />
      )}
    </>
  );
};

export default TodoPageLayout;
