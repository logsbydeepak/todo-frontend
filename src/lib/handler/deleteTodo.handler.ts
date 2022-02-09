import {
  SetAPIRequestDataType,
  TodoType,
  DispatchTodoActionType,
  SetLoadingIconType,
} from "types";

export const handleDeleteTodo = async (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  dispatchTodoAction: DispatchTodoActionType,
  todoItem: TodoType,
  setLoadingIcon: SetLoadingIconType
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
