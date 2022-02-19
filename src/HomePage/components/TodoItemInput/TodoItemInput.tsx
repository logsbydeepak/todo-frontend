import React, { ChangeEvent, FunctionComponent, useState } from "react";

import { handleDeleteTodo } from "./helper/deleteTodo.handler";
import { handleChangeTodoTask } from "./helper/changeTask.handler";
import { handleChangeTodoStatus } from "./helper/changeTodoStatus.handler.";

import { InputWithIcon } from "global/components/Input";
import { ButtonWithIcon } from "global/components/Button";

import style from "./TodoItemInput.module.scss";
import { DispatchTodoActionType, TodoType } from "HomePage/helper/types";
import { SetAPIRequestDataType } from "global/hooks";
import iconColor from "global/components/styles/iconColor.module.scss";

interface Props {
  index: number;
  dispatchTodoAction: DispatchTodoActionType;
  todoItem: TodoType;
  setAPIRequestData: SetAPIRequestDataType;
}

export const TodoItemInput: FunctionComponent<Props> = ({
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
            className={iconColor.primary}
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
                handleOnClick={handleInputReset}
                className={iconColor.green}
                isDisabled={isDisabled}
              />

              <ButtonWithIcon
                icon="done_all"
                isLoading={loadingIcon.task}
                isDisabled={isDisabled}
                className={iconColor.white}
                handleOnClick={handleOnDoneClick}
              />
            </>
          )}

          <ButtonWithIcon
            icon="delete_outline"
            isDisabled={isDisabled}
            isLoading={loadingIcon.delete}
            className={iconColor.red}
            handleOnClick={handleOnDeleteClick}
          />
        </div>
      </InputWithIcon>
    </>
  );
};
