import { FunctionComponent, useState, ChangeEvent } from "react";

import { useAPICall } from "hooks";
import { DispatchTodoActionType } from "pages/Index/helper/types";
import { ButtonWithIcon } from "components/Button";
import { handleCreateTodo } from "./helper/handeleCreateTodo";
import style from "./TodoCreateInput.module.scss";

interface Props {
  dispatchTodoAction: DispatchTodoActionType;
}

export const TodoCreateInput: FunctionComponent<Props> = ({
  dispatchTodoAction,
}) => {
  const [inputState, setInputState] = useState({
    textInput: "",
    isLoading: false,
    isError: false,
  });

  const [setAPIRequestData] = useAPICall();
  const { textInput, isLoading, isError } = inputState;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...inputState, textInput: event.target.value });
  };

  return (
    <form className={`${isError && `${style.error} ${style.error}`}`}>
      <div className={style.container}>
        <input
          type="text"
          className={`${style.input} ${style.input}`}
          placeholder="Add new task"
          autoFocus
          disabled={isLoading}
          value={textInput}
          onChange={handleInputChange}
        />
        <ButtonWithIcon
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
      <p className={`${style.helper}`}>{isError && "Task can't be empty"}</p>
    </form>
  );
};
