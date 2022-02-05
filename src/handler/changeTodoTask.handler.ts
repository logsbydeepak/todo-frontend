import { Dispatch, SetStateAction } from "react";
import { requestDataType } from "types";

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
  todo: any,
  dispatchTodoAction: any
) => {
  const indexTodo = todo[index];
  setAPIRequestData({
    data: {
      method: "PUT",
      url: "/todo",
      data: {
        id: indexTodo._id,
        status: indexTodo.status,
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
