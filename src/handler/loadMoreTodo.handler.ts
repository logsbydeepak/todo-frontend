import {
  DispatchNotificationType,
  DispatchTodoActionType,
  SetAPIRequestDataType,
  TodoMenu,
} from "types";

export const handleGetMoreTodo = (
  dispatchTodoAction: DispatchTodoActionType,
  setAPIRequestData: SetAPIRequestDataType,
  activeMenu: TodoMenu,
  skip: number,
  dispatchNotification: DispatchNotificationType
) => {
  dispatchTodoAction({
    type: "LOAD_MORE",
    isLoadingMore: true,
  });

  setAPIRequestData({
    data: {
      method: "GET",
      url: `/todo?status=${activeMenu}&skip=${skip}&limit=5`,
    },
    response: {
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
    },
  });
};
