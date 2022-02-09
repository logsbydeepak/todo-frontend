import { v4 } from "uuid";

import { NotificationStateType, NotificationActionType } from "types";

export const notificationReducer = (
  state: NotificationStateType,
  action: NotificationActionType
) => {
  switch (action.type) {
    case "SUCCESS":
      return [
        { id: v4(), status: "SUCCESS", message: action.message },
        ...state,
      ];
    case "ERROR":
      return [{ id: v4(), status: "ERROR", message: action.message }, ...state];

    case "REMOVE":
      return state.filter(
        (notification: { id: string }) => notification.id !== action.id
      );

    default:
      return state;
  }
};
