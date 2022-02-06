import { Dispatch, SetStateAction } from "react";
import { requestDataType, TodoType } from "types";

export const handleChangeTodoTask = (
  setAPIRequestData: Dispatch<SetStateAction<requestDataType>>,
  index: number,
  setLoadingIcon: Dispatch<
    SetStateAction<{
      status: boolean;
      task: boolean;
      delete: boolean;
    }>
  >,
  setTick: Dispatch<SetStateAction<boolean>>,
  localTask: string,
  todoItem: TodoType,
  dispatchTodoAction: any
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
