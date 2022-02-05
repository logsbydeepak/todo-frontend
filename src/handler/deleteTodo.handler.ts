import { Dispatch, useDebugValue } from "react";
import { TodoActionType } from "types/todoReducerType";

export const handleDeleteTodo = async (
  setAPIRequestData: any,
  index: number,
  dispatchTodoAction: Dispatch<TodoActionType>,
  todo: any,
  setLoadingIcon: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      task: boolean;
      delete: boolean;
    }>
  >
) => {
  setAPIRequestData({
    data: {
      method: "DELETE",
      url: `/todo?id=${todo[index]._id}`,
    },
    response: {
      onSuccess: () => {
        dispatchTodoAction({
          type: "REMOVE_TODO",
          index,
        });
      },
      onError: () => {
        setLoadingIcon((preValue) => ({ ...preValue, delete: false }));
      },
    },
  });
};
