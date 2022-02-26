import { SetAPIRequestDataType } from "hooks";

import {
  SetLoadingIconType,
  TodoType,
  DispatchTodoActionType,
  SetIsDisabled,
} from "pages/Index/helper/types";

const handleChangeStatus = (
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

export default handleChangeStatus;
