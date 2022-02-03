import { apiRequest } from "helper/apiRequest.helper";
import { NextRouter } from "next/router";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { NotificationActionType } from "types/notificationContextType";
import { TodoActionType } from "types/todoReducerType";

export const handleCreateTodo = async (
  event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setTask: Dispatch<SetStateAction<string>>,
  task: string,
  changeAuth: (value: boolean) => void,
  router: NextRouter,
  dispatchNotification: Dispatch<NotificationActionType>,
  dispatchTodoAction: Dispatch<TodoActionType>
) => {
  event.preventDefault();
  setIsLoading(true);

  if (task.length === 0) {
    setIsError(true);
    setIsLoading(false);
    return;
  }

  try {
    const response = await apiRequest(
      "POST",
      `/todo`,
      changeAuth,
      router,
      dispatchNotification,
      {
        status: false,
        task,
      }
    );
    if (!response) {
      throw response;
    }
    dispatchTodoAction({
      type: "ADD_TODO_FROM_TOP",
      todo: { _id: response.id, task: response.task, status: false },
    });
    dispatchNotification({ type: "SUCCESS", message: "Task added" });
    setTask("");
    setIsLoading(false);
    setIsError(false);
  } catch (error: any) {
    dispatchNotification({
      type: "ERROR",
      message: "",
    });
  }
};
