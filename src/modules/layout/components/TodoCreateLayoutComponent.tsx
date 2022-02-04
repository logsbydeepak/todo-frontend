import {
  FunctionComponent,
  useState,
  MouseEvent,
  Dispatch,
  ChangeEvent,
} from "react";

import { useRouter } from "next/router";

import { useAuthContext } from "modules/context/AuthContext";
import { TodoActionType } from "types/todoReducerType";
import { useNotificationContext } from "modules/context/NotificationContext";

import { ButtonWithIcon } from "modules/common/Button";
import inputStyle from "styles/modules/common/input.module.scss";
import style from "styles/modules/common/createTaskInput.module.scss";
import { handleCreateTodo } from "handler/createTodo.handler";

interface Props {
  dispatchTodoAction: Dispatch<TodoActionType>;
}

const TodoCreateLayoutComponent: FunctionComponent<Props> = ({
  dispatchTodoAction,
}) => {
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
            ) =>
              handleCreateTodo(
                event,
                setIsLoading,
                setIsError,
                setTask,
                task,
                changeAuth,
                router,
                dispatchNotification,
                dispatchTodoAction
              )
            }
          />
        </div>
        <p className={`${inputStyle.helper}`}>
          {isError && "Task can't be empty"}
        </p>
      </form>
    </>
  );
};

export default TodoCreateLayoutComponent;
