import { SetAPIRequestDataType } from "hooks";

import {
  TodoType,
  SetIsDisabled,
  SetLoadingIconType,
  DispatchTodoActionType,
} from "pages/Index/helper/types";

const handleDeleteTodo = async (
  setAPIRequestData: SetAPIRequestDataType,
  index: number,
  dispatchTodoAction: DispatchTodoActionType,
  todoItem: TodoType,
  setLoadingIcon: SetLoadingIconType,
  setIsDisabled: SetIsDisabled
) => {
  setAPIRequestData({
    request: {
      method: "DELETE",
      url: `/todo?id=${todoItem._id}`,
    },
    onSuccess: () => {
      dispatchTodoAction({
        type: "REMOVE_TODO",
        index,
      });
    },
    onError: () => {
      setIsDisabled(false);
      setLoadingIcon((preValue) => ({ ...preValue, delete: false }));
    },
  });
};

export default handleDeleteTodo;
