import { Dispatch, SetStateAction } from "react";
import { DispatchTodoActionType } from "HomePage/helper/types";
import { SetAPIRequestDataType } from "global/hooks";
import { SetIsDisabled } from "HomePage/helper/types";
import { SetLoadingIconType } from "HomePage/helper/types";
import { TodoType } from "HomePage/helper/types";

export const handleChangeTodoTask = (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  setLoadingIcon: SetLoadingIconType,
  setTick: Dispatch<SetStateAction<boolean>>,
  localTask: string,
  todoItem: TodoType,
  dispatchTodoAction: DispatchTodoActionType,
  setIsDisabled: SetIsDisabled
) => {
  setAPIRequestData({
    request: {
      method: "PUT",
      url: "/todo",
      body: {
        id: todoItem._id,
        status: todoItem.status,
        task: localTask,
      },
    },
    onSuccess: () => {
      dispatchTodoAction({
        type: "UPDATE_TODO_TASK",
        index,
        task: localTask,
      });
      setIsDisabled(false);
      setLoadingIcon((preValue) => ({ ...preValue, task: false }));
      setTick(false);
    },

    onError: () => {
      setIsDisabled(false);
      setLoadingIcon((preValue) => ({ ...preValue, task: false }));
    },
  });
};
