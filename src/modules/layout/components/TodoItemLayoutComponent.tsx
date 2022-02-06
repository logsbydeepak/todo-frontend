import React, {
  ChangeEvent,
  FunctionComponent,
  MouseEvent,
  useState,
} from "react";
import style from "styles/modules/common/taskInput.module.scss";
import Spinner from "modules/common/Spinner";
import { handleDeleteTodo } from "handler/deleteTodo.handler";
import { useAPICall } from "helper/useAPICall.helper";
import { handleChangeTodoStatus } from "handler/changeTodoStatus.handler";
import { handleChangeTodoTask } from "handler/changeTodoTask.handler";
import { TodoItemPropsType, TodoType } from "types";

const TaskInputLayoutComponent: FunctionComponent<TodoItemPropsType> = ({
  index,
  dispatchTodoAction,
  todoItem,
}) => {
  const [focus, setFocus] = useState(false);
  const [tick, setTick] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState({
    status: false,
    task: false,
    delete: false,
  });

  const { task, status } = todoItem;

  const [setAPIRequestData] = useAPICall(null);

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
        <button
          className={style.taskForm__button}
          onClick={(
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            event.preventDefault();
            setLoadingIcon({ ...loadingIcon, status: true });
            handleChangeTodoStatus(
              setAPIRequestData,
              index,
              setLoadingIcon,
              dispatchTodoAction,
              todoItem
            );
          }}
        >
          {!loadingIcon.status && (
            <i
              className={`icon ${style.taskForm__icon} ${style.taskForm__icon__check}`}
            >
              {status ? "check_circle_outline" : "radio_button_unchecked"}
            </i>
          )}
          {loadingIcon.status && (
            <Spinner className={style.taskForm__spinner} />
          )}
        </button>

        <input
          className={style.taskForm__taskInput}
          type="text"
          value={localTask}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {tick && (
          <button className={style.taskForm__button} onClick={handleInputReset}>
            {!loadingIcon.task && tick && (
              <i
                className={`icon ${style.taskForm__icon} ${style.taskForm__icon__reset}`}
              >
                settings_backup_restore
              </i>
            )}
          </button>
        )}
        {tick && (
          <button
            className={style.taskForm__button}
            onClick={(
              event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            ) => {
              event.preventDefault();
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
          >
            {!loadingIcon.task && tick && (
              <i
                className={`icon ${style.taskForm__icon} ${style.taskForm__icon__done}`}
              >
                done_all
              </i>
            )}
            {loadingIcon.task && (
              <Spinner className={style.taskForm__spinner} />
            )}
          </button>
        )}

        <button
          className={style.taskForm__button}
          onClick={(
            event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            event.preventDefault();
            setLoadingIcon({ ...loadingIcon, delete: true });
            handleDeleteTodo(
              setAPIRequestData,
              index,
              dispatchTodoAction,
              todoItem,
              setLoadingIcon
            );
          }}
        >
          {!loadingIcon.delete && (
            <i
              className={`icon ${style.taskForm__icon} ${style.taskForm__icon__delete}`}
            >
              delete_outline
            </i>
          )}
          {loadingIcon.delete && (
            <Spinner className={style.taskForm__spinner} />
          )}
        </button>
      </form>
    </>
  );
};

export default TaskInputLayoutComponent;
