import { apiRequest } from "helper/apiRequest.helper";
import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { NotificationActionType } from "types/notificationContextType";
import { TodoActionType } from "types/todoReducerType";

export const handleDeleteTodo = async (
  index: number,

  changeAuth: (value: boolean) => void,
  router: NextRouter,
  dispatchNotification: Dispatch<NotificationActionType>,
  dispatchTodoAction: Dispatch<TodoActionType>,
  todo: any
) => {
  await apiRequest(
    "DELETE",
    `/todo?id=${todo[index]._id}`,
    changeAuth,
    router,
    dispatchNotification
  );
  dispatchTodoAction({
    type: "REMOVE_TODO",
    index,
  });
  dispatchNotification({ type: "SUCCESS", message: "Task removed" });
};
