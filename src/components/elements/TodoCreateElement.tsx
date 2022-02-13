import { FunctionComponent, useState, MouseEvent, ChangeEvent } from "react";

import { ButtonWithIcon } from "components/common/Button";
import inputStyle from "components/common/styles/input.module.scss";
import style from "./styles/todoCreate.element.module.scss";
import { handleCreateTodo } from "lib/handler/todo/create.todo.handler";
import { useAPICall } from "lib/helper/useAPICall.helper";
import { DispatchTodoActionType } from "types";

interface Props {
  dispatchTodoAction: DispatchTodoActionType;
}

const TodoCreateLayoutComponent: FunctionComponent<Props> = ({
  dispatchTodoAction,
}) => {
  const [inputState, setInputState] = useState({
    textInput: "",
    isLoading: false,
    isError: false,
  });

  const [setAPIRequestData] = useAPICall(null);
  const { textInput, isLoading, isError } = inputState;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...inputState, textInput: event.target.value });
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
            value={textInput}
            onChange={handleInputChange}
          />
          <ButtonWithIcon
            loading={isLoading}
            isError={isError}
            handleOnClick={async (
              event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            ) => {
              event.preventDefault();
              handleCreateTodo(
                setAPIRequestData,
                inputState,
                setInputState,
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

export default TodoCreateLayoutComponent;
