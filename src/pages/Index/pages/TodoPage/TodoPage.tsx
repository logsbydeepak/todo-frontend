import Head from "next/head";
import { useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { PageTitle } from "components/PageTitle";
import { ButtonWithTextAndIcon } from "components/Button";

import { TodoStateType, TodoType } from "pages/Index/helper/types";

import { useAPICall } from "hooks";
import { useNotificationContext } from "context/NotificationContext";
import { HelperTextAndSpinner } from "components/HelperTextAndSpinner";
import handleGetMoreTodo from "../../helper/handleGetMoreTodo";
import handleGetTodoOnMenuChange from "../../helper/handleGetTodoOnMenuChange";

import todoReducer from "../../helper/todoReducer";
import { TodoCreateInput } from "../../components/TodoCreateInput";
import { TodoMenu } from "../../components/TodoMenu";
import { TodoItemInput } from "../../components/TodoItemInput";

const initialTodoState: TodoStateType = {
  todo: [],
  activeMenu: "false",
  isLoading: false,
  isLoadingMore: false,
  showLoadMoreButton: false,
};

const TodoPage = () => {
  const [todoState, dispatchTodoAction] = useImmerReducer(
    todoReducer,
    initialTodoState
  );

  const { todo, activeMenu, isLoading, isLoadingMore, showLoadMoreButton } =
    todoState;

  const [setAPIRequestData] = useAPICall();
  const { dispatchNotification } = useNotificationContext();

  useEffect(() => {
    handleGetTodoOnMenuChange(
      setAPIRequestData,
      dispatchTodoAction,
      activeMenu
    );
  }, [activeMenu, dispatchTodoAction, setAPIRequestData]);

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

export default TodoPage;
