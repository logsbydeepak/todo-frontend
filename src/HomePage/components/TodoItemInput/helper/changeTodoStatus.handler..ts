import { TodoType } from "HomePage/helper/types";
import { SetLoadingIconType } from "HomePage/helper/types";
import { SetAPIRequestDataType } from "global/hooks";
import { DispatchTodoActionType } from "HomePage/helper/types";
import { SetIsDisabled } from "HomePage/helper/types";

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
      url: `/todo
      `,
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
