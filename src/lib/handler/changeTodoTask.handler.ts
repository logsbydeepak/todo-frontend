import { Dispatch, SetStateAction } from "react";
import {
  DispatchTodoActionType,
  SetAPIRequestDataType,
  SetIsDisabled,
  SetLoadingIconType,
  TodoType,
} from "types";

export const handleChangeTodoTask = (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  setLoadingIcon: SetLoadingIconType,
  setTick: Dispatch<SetStateAction<boolean>>,
  localTask: string,
  todoItem: TodoType,
  dispatchTodoAction: DispatchTodoActionType,
  setIsDisabled: SetIsDisabled
) => {
  setAPIRequestData({
    data: {
      method: "PUT",
      url: "/todo",
      data: {
        id: todoItem._id,
        status: todoItem.status,
        task: localTask,
      },
    },
    response: {
      onSuccess: () => {
        dispatchTodoAction({
          type: "UPDATE_TODO_TASK",
          index,
          task: localTask,
        });
        setIsDisabled(false);
        setLoadingIcon((preValue) => ({ ...preValue, task: false }));
        setTick(false);
      },

      onError: () => {
        setIsDisabled(false);
        setLoadingIcon((preValue) => ({ ...preValue, task: false }));
      },
    },
  });
};