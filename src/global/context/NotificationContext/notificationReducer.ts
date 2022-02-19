import { v4 } from "uuid";

import { NotificationDraftType, NotificationActionType } from ".";

export const notificationReducer = (
  draft: NotificationDraftType,
  action: NotificationActionType
) => {
  switch (action.type) {
    case "SUCCESS":
      draft.unshift({
        id: v4(),
        status: "SUCCESS",
        message: action.message,
      });
      break;

    case "ERROR":
      draft.unshift({
        id: v4(),
        status: "ERROR",
        message: action.message,
      });
      break;

    case "REMOVE":
      draft.pop();
      break;

    default:
      draft;
  }
};
