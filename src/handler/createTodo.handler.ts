import { Dispatch, SetStateAction } from "react";
import { requestDataType } from "types/hooks.types";
import { TodoActionType } from "types/todoReducerType";

export const handleCreateTodo = async (
  setAPIRequestData: Dispatch<SetStateAction<requestDataType>>,
  inputState: {
    textInput: string;
    isLoading: boolean;
    isError: boolean;
  },
  setInputState: Dispatch<
    SetStateAction<{
      textInput: string;
      isLoading: boolean;
      isError: boolean;
    }>
  >,
  dispatchTodoAction: Dispatch<TodoActionType>
) => {
  const { textInput } = inputState;
  setInputState({ ...inputState, isLoading: true });

  if (textInput.length === 0) {
    setInputState({ ...inputState, isError: true, isLoading: false });
    return;
  }

  setAPIRequestData({
    data: {
      method: "POST",
      url: "/todo",
      data: {
        task: textInput,
        status: false,
      },
    },
    response: {
      onSuccess: (successResponse: any) => {
        setInputState({ textInput: "", isLoading: false, isError: false });
        dispatchTodoAction({
          type: "ADD_TODO_FROM_TOP",
          todo: {
            _id: successResponse.id,
            task: successResponse.task,
            status: false,
          },
        });
      },

      onError: () => {
        setInputState({ textInput: "", isLoading: false, isError: false });
      },
    },
  });
};
