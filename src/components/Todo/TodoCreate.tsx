import {
  FunctionComponent,
  useState,
  MouseEvent,
  Dispatch,
  ChangeEvent,
} from "react";

import { useRouter } from "next/router";

import { APIRequest } from "helper/APIRequest";
import { useAuthContext } from "context/AuthContext";
import { TodoActionType } from "types/todoReducerType";
import { useNotificationContext } from "context/NotificationContext";

import { ButtonWithIcon } from "components/Button";
import inputStyle from "styles/module/components/input.module.scss";
import style from "styles/module/components/createTaskInput.module.scss";
import { handleCreateTodo } from "helper/request/createTodo";

interface Props {
  dispatchTodoAction: Dispatch<TodoActionType>;
}

const TodoCreate: FunctionComponent<Props> = ({ dispatchTodoAction }) => {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { dispatchNotification } = useNotificationContext();

  const { changeAuth } = useAuthContext();
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  return (
    <>
      <form className={`${style.base} ${isError && inputStyle.error}`}>
        <div>
          <input
            type="text"
            className={`${style.input} ${inputStyle.input}`}
            placeholder="Add new task"
            autoFocus={true}
            disabled={isLoading}
            value={task}
            onChange={handleInputChange}
          />
          <ButtonWithIcon
            loading={isLoading}
            isError={isError}
            handleOnClick={(
              event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            ) => {
              event.preventDefault();
              handleCreateTodo(
                setIsLoading,
                setIsError,
                setTask,
                task,
                changeAuth,
                router,
                dispatchNotification,
                dispatchTodoAction
              );
            }}
          />
        </div>
        <p className={`${inputStyle.helper}`}>
          {isError && "Task can't be empty"}
        </p>
      </form>
    </>
  );
};

export default TodoCreate;
