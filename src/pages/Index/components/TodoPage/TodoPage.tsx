import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useImmerReducer } from "use-immer";

import { PageTitle } from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";

import { todoReducer } from "pages/Index/helper/todo.reducer";
import { TodoStateType, TodoType } from "pages/Index/helper/types";

import { useAPICall } from "hooks";
import { handleGetMoreTodo } from "pages/Index/helper/loadMore.handler";
import { useNotificationContext } from "context/NotificationContext";
import { handleGetTodoOnMenuChange } from "pages/Index/helper/getTodoOnMenuChange.handler";

import { HelperTextAndSpinner } from "components/HelperTextAndSpinner";
import { TodoCreateInput } from "../TodoCreateInput";
import { TodoMenu } from "../TodoMenu";
import { TodoItemInput } from "../TodoItemInput";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

export var TodoPage = () => {
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
  }, [activeMenu, dispatchTodoAction, setAPIRequestData]);

  useEffect(() => {
    useMemoHandleGetTodoOnMenuChange;
  }, [useMemoHandleGetTodoOnMenuChange]);

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
        todo.map((todoItem: TodoType, index: number) => (
          <form key={todoItem._id}>
            <TodoItemInput
              index={index}
              todoItem={todoItem}
              dispatchTodoAction={dispatchTodoAction}
              setAPIRequestData={setAPIRequestData}
            />
          </form>
        ))}

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
