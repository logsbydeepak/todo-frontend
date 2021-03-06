import { SetAPIRequestDataType } from "hooks";

import { TodoMenuType, DispatchTodoActionType } from "./types";

const handleGetTodoOnMenuChange = async (
  setAPIRequestData: SetAPIRequestDataType,
  dispatchTodoAction: DispatchTodoActionType,
  activeMenu: TodoMenuType
) => {
  dispatchTodoAction({
    type: "EMPTY_TODO",
  });

  dispatchTodoAction({
    type: "LOADING",
    isLoading: true,
  });

  setAPIRequestData({
    request: {
      method: "GET",
      url: `/todo?status=${activeMenu}&skip=${0}&limit=5`,
    },
    onSuccess: (successResponse: any) => {
      dispatchTodoAction({
        type: "ADD_TODO_FROM_BOTTOM",
        todo: successResponse,
      });

      dispatchTodoAction({
        type: "LOADING",
        isLoading: false,
      });
    },
    onError: () => {
      dispatchTodoAction({
        type: "LOADING",
        isLoading: false,
      });
    },
  });
};

export default handleGetTodoOnMenuChange;
