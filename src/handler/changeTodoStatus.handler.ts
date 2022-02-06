import {
  DispatchTodoActionType,
  SetLoadingIconType,
  TodoType,
  SetAPIRequestDataType,
} from "types";

export const handleChangeTodoStatus = (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  setLoadingIcon: SetLoadingIconType,
  dispatchTodoAction: DispatchTodoActionType,
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
      onSuccess: () => {
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
        dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
      },
      onError: () => {
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
      },
    },
  });
};
