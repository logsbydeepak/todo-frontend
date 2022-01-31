import { ButtonIcon } from "components/Button";
import CreateTaskInput from "components/CreateTaskInput";
import Loading from "components/Loading";
import PageTitle from "components/PageTitle";
import TaskInput from "components/TaskInput";
import TodoMenu from "components/TodoMenu";
import { useEffect, useReducer } from "react";
import { todoReducer } from "reducer/todoReducer";
import { TodoStateType } from "types/todoReducerType";

import style from "styles/module/pages/Index.module.scss";
import Head from "next/head";
import { useAuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { APIRequest } from "helper/APIRequest";

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

  const getTodo = async () => {
    const response = await APIRequest(
      "GET",
      `/todo?status=${todoState.activeMenu}&skip=${todoState.todo.length}&limit=5`,
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

  const loadMoreHandle = () => {};

  return (
    <>
      <Head>
        <title>TODO - Get work done</title>
      </Head>
      <PageTitle title="Your Todos" subtitle="Manage your task" />
      <CreateTaskInput handleAddTask={handleAddTask} />
      <TodoMenu dispatchTodoAction={dispatchTodoAction} todoState={todoState} />
      {todoState.isLoading ? (
        <Loading />
      ) : (
        todoState.todo.map((task: any, index: number) => {
          return (
            <TaskInput
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
          loading={false}
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
