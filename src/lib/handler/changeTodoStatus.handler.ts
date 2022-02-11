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
        setIsDisabled(false);
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
        dispatchTodoAction({ type: "UPDATE_TODO_STATUS", index });
      },
      onError: () => {
        setIsDisabled(false);
        setLoadingIcon((preValue) => ({ ...preValue, status: false }));
      },
    },
  });
};
