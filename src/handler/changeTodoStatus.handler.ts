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
  todo: TodoType[]
) => {
  const indexTodo = todo[index];
  setAPIRequestData({
    data: {
      url: `/todo`,
      method: "PUT",
      data: {
        id: indexTodo._id,
        task: indexTodo.task,
        status: !indexTodo.status,
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
