import React, { ChangeEvent, FunctionComponent, useState } from "react";

import { handleDeleteTodo } from "HomePage/handler/delete.todo.handler";
import { handleChangeTodoTask } from "HomePage/handler/changeTask.todo.handler";
import { handleChangeTodoStatus } from "HomePage/handler/changeStatus.todo.handler.";

import { InputWithIcon, ButtonWithIcon } from "global/components";

import { TodoItemPropsType } from "HomePage/todoItemTypes";
import style from "global/components/styles/iconColor.module.scss";

const TaskInputLayoutComponent: FunctionComponent<TodoItemPropsType> = ({
  index,
  dispatchTodoAction,
  todoItem,
  setAPIRequestData,
}) => {
  const [tick, setTick] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
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

  const handleInputReset = () => {
    setLocalTask(task);
    setTick(false);
  };

  const handleOnCheckClick = () => {
    setIsDisabled(true);
    setLoadingIcon({ ...loadingIcon, status: true });
    handleChangeTodoStatus(
      setAPIRequestData,
      index,
      setLoadingIcon,
      dispatchTodoAction,
      todoItem,
      setIsDisabled
    );
  };

  const handleOnDoneClick = () => {
    setIsDisabled(true);
    setLoadingIcon({ ...loadingIcon, task: true });
    handleChangeTodoTask(
      setAPIRequestData,
      index,
      setLoadingIcon,
      setTick,
      localTask,
      todoItem,
      dispatchTodoAction,
      setIsDisabled
    );
  };

  const handleOnDeleteClick = () => {
    setIsDisabled(true);
    setLoadingIcon({ ...loadingIcon, delete: true });
    handleDeleteTodo(
      setAPIRequestData,
      index,
      dispatchTodoAction,
      todoItem,
      setLoadingIcon,
      setIsDisabled
    );
  };

  return (
    <>
      <InputWithIcon
        placeholder={"Task"}
        value={localTask}
        handleOnChange={handleInputChange}
        isDisabled={isDisabled}
        className={`${style.form}`}
      >
        <div className="left">
          <ButtonWithIcon
            icon={status ? "check_circle_outline" : "radio_button_unchecked"}
            isLoading={loadingIcon.status}
            className={style.icon__check}
            isDisabled={isDisabled}
            handleOnClick={handleOnCheckClick}
          />
        </div>
        <div className="right">
          {tick && (
            <>
              <ButtonWithIcon
                icon="settings_backup_restore"
                isLoading={false}
                className={style.icon__reset}
                handleOnClick={handleInputReset}
                isDisabled={isDisabled}
              />

              <ButtonWithIcon
                icon="done_all"
                isLoading={loadingIcon.task}
                className={style.icon__done}
                isDisabled={isDisabled}
                handleOnClick={handleOnDoneClick}
              />
            </>
          )}

          <ButtonWithIcon
            icon="delete_outline"
            isDisabled={isDisabled}
            isLoading={loadingIcon.delete}
            className={style.icon__delete}
            handleOnClick={handleOnDeleteClick}
          />
        </div>
      </InputWithIcon>
    </>
  );
};

export default TaskInputLayoutComponent;
