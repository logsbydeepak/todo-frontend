import {
  DispatchNotificationType,
  DispatchTodoActionType,
  SetAPIRequestDataType,
  TodoMenuType,
} from "types";

export const handleGetMoreTodo = (
  dispatchTodoAction: DispatchTodoActionType,
  setAPIRequestData: SetAPIRequestDataType,
  activeMenu: TodoMenuType,
  skip: number,
  dispatchNotification: DispatchNotificationType
) => {
  dispatchTodoAction({
    type: "LOAD_MORE",
    isLoadingMore: true,
  });

  setAPIRequestData({
    request: {
      method: "GET",
      url: `/todo?status=${activeMenu}&skip=${skip}&limit=5`,
    },
    onSuccess: (successResponse: any) => {
      dispatchTodoAction({
        type: "ADD_TODO_FROM_BOTTOM",
        todo: successResponse,
      });

      dispatchTodoAction({
        type: "LOAD_MORE",
        isLoadingMore: false,
      });

      if (!(successResponse.length >= 5)) {
        dispatchNotification({
          type: "SUCCESS",
          message: "No task left",
        });
      }
    },
    onError: () => {
      dispatchTodoAction({
        type: "LOAD_MORE",
        isLoadingMore: false,
      });
    },
  });
};
