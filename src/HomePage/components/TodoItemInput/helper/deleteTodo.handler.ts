import { SetAPIRequestDataType } from "global/hooks";
import { TodoType } from "HomePage/helper/types";
import { SetIsDisabled } from "HomePage/helper/types";
import { SetLoadingIconType } from "HomePage/helper/types";
import { DispatchTodoActionType } from "HomePage/helper/types";

export const handleDeleteTodo = async (
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
