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

interface Props {
  dispatchTodoAction: Dispatch<TodoActionType>;
}

const TodoCreate: FunctionComponent<Props> = ({ dispatchTodoAction }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const { dispatchNotification } = useNotificationContext();

  const { changeAuth } = useAuthContext();
  const router = useRouter();

  const createTodo = async (task: string) =>
    await APIRequest("POST", `/todo`, changeAuth, router, {
      status: false,
      task,
    });

  const handleAddTask = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);
    if (task.length === 0) {
      setError(true);
      setLoading(false);
      return;
    }
    const response = await createTodo(task);
    dispatchTodoAction({
      type: "ADD_TODO_FROM_TOP",
      todo: { _id: response.id, task: response.task, status: false },
    });
    dispatchNotification({ type: "SUCCESS", message: "Task added" });
    setTask("");
    setLoading(false);
    setError(false);
  };

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
            disabled={loading}
            value={task}
            onChange={handleInputChange}
          />
          <ButtonWithIcon
            loading={loading}
            isError={isError}
            handleOnClick={handleAddTask}
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
