import { Dispatch, SetStateAction } from "react";
import { TodoActionType, TodoType } from "types";
import { requestDataType } from "types/hooks.types";

export const handleChangeTodoStatus = (
  setAPIRequestData: Dispatch<SetStateAction<requestDataType>>,
  index: number,
  setLoadingIcon: Dispatch<
    SetStateAction<{
      status: boolean;
      task: boolean;
      delete: boolean;
    }>
  >,
  dispatchTodoAction: Dispatch<SetStateAction<TodoActionType>>,
  todoItem: TodoType
) => {
  setAPIRequestData({
    data: {
      url: `/todo`,
      method: "PUT",
      data: {
        id: todoItem._id,
        task: todoItem.task,
        status: !todoItem.status,
      },
    },
    response: {
      onSuccess: (response: any) => {
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
        dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
      },
      onError: () => {
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
      },
    },
  });
};
