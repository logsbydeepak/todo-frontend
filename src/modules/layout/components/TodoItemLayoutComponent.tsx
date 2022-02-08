import React, { ChangeEvent, FunctionComponent, useState } from "react";
import style from "styles/modules/common/taskInput.module.scss";
import { handleDeleteTodo } from "handler/deleteTodo.handler";
import { handleChangeTodoStatus } from "handler/changeTodoStatus.handler";
import { handleChangeTodoTask } from "handler/changeTodoTask.handler";
import { TodoItemPropsType } from "types";
import { ButtonWithSmallIcon } from "modules/common/Button";

const TaskInputLayoutComponent: FunctionComponent<TodoItemPropsType> = ({
  index,
  dispatchTodoAction,
  todoItem,
  setAPIRequestData,
}) => {
  const [focus, setFocus] = useState(false);
  const [tick, setTick] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState({
    status: false,
    task: false,
    delete: false,
  });

  const { task, status } = todoItem;
  const [localTask, setLocalTask] = useState(task);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalTask(event.target.value);
    setTick(true);
  };

  const handleInputFocus = () => {
    setFocus(!focus);
  };

  const handleInputBlur = () => {
    setFocus(!focus);
  };

  const handleInputReset = () => {
    setLocalTask(task);
    setTick(false);
  };

  return (
    <>
      <form className={`${style.taskForm} ${focus && style.taskForm__focus}`}>
        <ButtonWithSmallIcon
          icon={status ? "check_circle_outline" : "radio_button_unchecked"}
          isLoading={loadingIcon.status}
          className={`${style.taskForm__icon__check}`}
          handleOnClick={() => {
            setLoadingIcon({ ...loadingIcon, status: true });
            handleChangeTodoStatus(
              setAPIRequestData,
              index,
              setLoadingIcon,
              dispatchTodoAction,
              todoItem
            );
          }}
        />

        <input
          type="text"
          value={localTask}
          placeholder={"Task"}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          className={style.taskForm__taskInput}
        />

        {tick && (
          <>
            <ButtonWithSmallIcon
              icon="settings_backup_restore"
              isLoading={false}
              className={`${style.taskForm__icon__reset}`}
              handleOnClick={handleInputReset}
            />

            <ButtonWithSmallIcon
              icon="done_all"
              isLoading={loadingIcon.task}
              className={`${style.taskForm__icon__done}`}
              handleOnClick={() => {
                setLoadingIcon({ ...loadingIcon, task: true });
                handleChangeTodoTask(
                  setAPIRequestData,
                  index,
                  setLoadingIcon,
                  setTick,
                  localTask,
                  todoItem,
                  dispatchTodoAction
                );
              }}
            />
          </>
        )}

        <ButtonWithSmallIcon
          icon="delete_outline"
          isLoading={loadingIcon.delete}
          className={`${style.taskForm__icon__delete}`}
          handleOnClick={() => {
            setLoadingIcon({ ...loadingIcon, delete: true });
            handleDeleteTodo(
              setAPIRequestData,
              index,
              dispatchTodoAction,
              todoItem,
              setLoadingIcon
            );
          }}
        />
      </form>
    </>
  );
};

export default TaskInputLayoutComponent;
