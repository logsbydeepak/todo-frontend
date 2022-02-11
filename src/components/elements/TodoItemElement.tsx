import React, { ChangeEvent, FunctionComponent, useState } from "react";

import { handleDeleteTodo } from "lib/handler/deleteTodo.handler";
import { handleChangeTodoTask } from "lib/handler/changeTodoTask.handler";
import { handleChangeTodoStatus } from "lib/handler/changeTodoStatus.handler";

import { InputWithIcon } from "components/common/Input";
import { ButtonWithSmallIcon } from "components/common/Button";

import { TodoItemPropsType } from "types";
import style from "./styles/todoItem.element.module.scss";

const TaskInputLayoutComponent: FunctionComponent<TodoItemPropsType> = ({
  index,
  dispatchTodoAction,
  todoItem,
  setAPIRequestData,
}) => {
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

  const handleInputReset = () => {
    setLocalTask(task);
    setTick(false);
  };

  return (
    <>
      <InputWithIcon
        helper={""}
        isError={false}
        type={"text"}
        placeholder={"Task"}
        isDisabled={false}
        value={localTask}
        handleOnChange={handleInputChange}
      >
        <div className="left">
          <ButtonWithSmallIcon
            icon={status ? "check_circle_outline" : "radio_button_unchecked"}
            isLoading={loadingIcon.status}
            className={style.icon__check}
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
        </div>
        <div className="right">
          {tick && (
            <>
              <ButtonWithSmallIcon
                icon="settings_backup_restore"
                isLoading={false}
                className={style.icon__reset}
                handleOnClick={handleInputReset}
              />

              <ButtonWithSmallIcon
                icon="done_all"
                isLoading={loadingIcon.task}
                className={style.icon__done}
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
            className={style.icon__delete}
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
        </div>
      </InputWithIcon>
    </>
  );
};

export default TaskInputLayoutComponent;
