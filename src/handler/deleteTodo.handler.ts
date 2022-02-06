import { Dispatch } from "react";
import { TodoActionType } from "types/todoReducerType";
import { TodoType } from "types";

export const handleDeleteTodo = async (
  setAPIRequestData: any,
  index: number,
  dispatchTodoAction: Dispatch<TodoActionType>,
  todoItem: TodoType,
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
      url: `/todo?id=${todoItem._id}`,
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
