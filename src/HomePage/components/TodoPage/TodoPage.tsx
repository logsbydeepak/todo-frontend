import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useImmerReducer } from "use-immer";

import { PageTitle } from "global/components/PageTitle";
import { ButtonWithTextAndIcon } from "global/components/Button";

import { TodoItemInput } from "../TodoItemInput";
import { TodoMenu } from "../TodoMenu";
import { TodoCreateInput } from "../TodoCreateInput";

import { todoReducer } from "HomePage/helper/todo.reducer";
import { TodoStateType, TodoType } from "HomePage/helper/types";

import { useAPICall } from "global/hooks";
import { handleGetMoreTodo } from "HomePage/helper/loadMore.handler";
import { useNotificationContext } from "global/context/NotificationContext";
import { handleGetTodoOnMenuChange } from "HomePage/helper/getTodoOnMenuChange.handler";

import { HelperTextAndSpinner } from "global/components/HelperTextAndSpinner";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

export const TodoPage = () => {
  const [todoState, dispatchTodoAction] = useImmerReducer(
    todoReducer,
    initialTodoState
  );

  const { todo, activeMenu, isLoading, isLoadingMore, showLoadMoreButton } =
    todoState;

  const [setAPIRequestData] = useAPICall();
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
  }, []);

  return (
    <>
      <Head>
        <title>TODO - Get work done</title>
      </Head>
      <PageTitle title="Your Todo" subtitle="Manage your task" />
      <TodoCreateInput dispatchTodoAction={dispatchTodoAction} />
      <TodoMenu
        dispatchTodoAction={dispatchTodoAction}
        activeMenu={activeMenu}
      />

      {!isLoading &&
        todo.length !== 0 &&
        todo.map((todoItem: TodoType, index: number) => {
          return (
            <form key={todoItem._id}>
              <TodoItemInput
                index={index}
                todoItem={todoItem}
                dispatchTodoAction={dispatchTodoAction}
                setAPIRequestData={setAPIRequestData}
              />
            </form>
          );
        })}

      <HelperTextAndSpinner
        isLoading={isLoading}
        isError={todo.length === 0}
        helperText="No task to show"
      />

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
