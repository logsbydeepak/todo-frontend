import React, { ChangeEvent, FunctionComponent, useState } from "react";

import { SetAPIRequestDataType } from "hooks";
import { InputWithIcon } from "components/Input";
import { ButtonWithIcon } from "components/Button";

import { DispatchTodoActionType, TodoType } from "pages/Index/helper/types";
import iconColor from "components/styles/iconColor.module.scss";
import handleDeleteTodo from "./helper/handleDeleteTodo";
import handleChangeTask from "./helper/handleChangeTask";
import handleChangeStatus from "./helper/handleChangeStatus";

interface Props {
  index: number;
  dispatchTodoAction: DispatchTodoActionType;
  todoItem: TodoType;
  setAPIRequestData: SetAPIRequestDataType;
}

const TodoItemInput: FunctionComponent<Props> = ({
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
    handleChangeStatus(
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
    handleChangeTask(
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
    <InputWithIcon
      placeholder="Task"
      value={localTask}
      handleOnChange={handleInputChange}
      isDisabled={isDisabled}
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
              type="submit"
            />
          </>
        )}

        <ButtonWithIcon
          icon="delete_outline"
          isDisabled={isDisabled}
          isLoading={loadingIcon.delete}
          className={iconColor.red}
          handleOnClick={handleOnDeleteClick}
          type="submit"
        />
      </div>
    </InputWithIcon>
  );
};

export default TodoItemInput;
