import { ButtonIcon } from "components/Button";
import CreateTaskInput from "components/CreateTaskInput";
import Loading from "components/Loading";
import PageTitle from "components/PageTitle";
import TaskInput from "components/TaskInput";
import TodoMenu from "components/TodoMenu";
import { useReducer } from "react";
import { todoReducer } from "reducer/todoReducer";
import { TodoStateType } from "types/todoReducerType";

import style from "styles/module/pages/Index.module.scss";

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

  const handleAddTask = () => {};

  const handleChangeStatus = () => {};

  const handleChangeTask = () => {};

  const handleInputChange = () => {};

  const handleRemoveTask = () => {};

  const loadMoreHandle = () => {};

  return (
    <>
      <PageTitle title="Your Todos" subtitle="Manage your task" />
      <CreateTaskInput handleAddTask={handleAddTask} />
      <TodoMenu dispatchTodoAction={dispatchTodoAction} todoState={todoState} />
      {todoState.isLoading ? (
        <Loading />
      ) : (
        todoState.todo.map((task: any, index: number) => {
          return (
            <form key={task._id}>
              <TaskInput
                index={index}
                status={task.status}
                task={task.task}
                handleChangeStatus={handleChangeStatus}
                handleInputChange={handleInputChange}
                handleRemoveTask={handleRemoveTask}
                handleChangeTask={handleChangeTask}
              />
            </form>
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
