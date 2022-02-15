import {
  TodoType,
  SetLoadingIconType,
  SetAPIRequestDataType,
  DispatchTodoActionType,
  SetIsDisabled,
} from "types";

export const handleChangeTodoStatus = (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  setLoadingIcon: SetLoadingIconType,
  dispatchTodoAction: DispatchTodoActionType,
  todoItem: TodoType,
  setIsDisabled: SetIsDisabled
) => {
  setAPIRequestData({
    request: {
      url: `/todo`,
      method: "PUT",
      body: {
        id: todoItem._id,
        task: todoItem.task,
        status: !todoItem.status,
      },
    },
    onSuccess: () => {
      setIsDisabled(false);
      setLoadingIcon((preValue) => ({ ...preValue, status: false }));
      dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
    },
    onError: () => {
      setIsDisabled(false);
      setLoadingIcon((preValue) => ({ ...preValue, status: false }));
    },
  });
};
