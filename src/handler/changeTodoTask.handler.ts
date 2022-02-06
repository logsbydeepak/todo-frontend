import { Dispatch, SetStateAction } from "react";
import {
  DispatchTodoActionType,
  SetAPIRequestDataType,
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
  dispatchTodoAction: DispatchTodoActionType
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
        setLoadingIcon((preValue) => ({ ...preValue, task: false }));
        setTick(false);
      },

      onError: () => {
        setLoadingIcon((preValue) => ({ ...preValue, task: false }));
      },
    },
  });
};
