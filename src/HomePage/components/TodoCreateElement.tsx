import { FunctionComponent, useState, MouseEvent, ChangeEvent } from "react";

import inputStyle from "global/components/styles/input.module.scss";
import buttonStyle from "global/components/styles/button.module.scss";
import style from "./styles/todoCreate.element.module.scss";
import { handleCreateTodo } from "HomePage/handler/create.todo.handler";
import { useAPICall } from "global/hooks";
import { DispatchTodoActionType } from "global/reducer";
import { ButtonWithSmallIcon } from "global/components";

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
      <form className={`${isError && `${inputStyle.error} ${style.error}`}`}>
        <div className={style.container}>
          <input
            type="text"
            className={`${style.input} ${inputStyle.input}`}
            placeholder="Add new task"
            autoFocus={true}
            disabled={isLoading}
            value={textInput}
            onChange={handleInputChange}
          />
          <ButtonWithSmallIcon
            icon="arrow_forward_ios"
            isLoading={isLoading}
            handleOnClick={() => {
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
