import { Dispatch, SetStateAction } from "react";

import { SetAPIRequestDataType } from "hooks";

import {
  DispatchTodoActionType,
  SetLoadingIconType,
  SetIsDisabled,
  TodoType,
} from "pages/Index/helper/types";

const handleChangeTask = (
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

export default handleChangeTask;
