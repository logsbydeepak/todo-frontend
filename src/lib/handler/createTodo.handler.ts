import { SetAPIRequestDataType } from "types/hooks.types";

import {
  DispatchTodoActionType,
  InputStateType,
  SetInputStateType,
} from "types";

export const handleCreateTodo = async (
  setAPIRequestData: SetAPIRequestDataType,
  inputState: InputStateType,
  setInputState: SetInputStateType,
  dispatchTodoAction: DispatchTodoActionType
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
