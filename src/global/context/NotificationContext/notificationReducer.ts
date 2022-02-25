import { v4 } from "uuid";

import { NotificationDraftType, NotificationActionType } from ".";

const notificationReducer = (
  draft: NotificationDraftType,
  action: NotificationActionType
) => {
  switch (action.type) {
    case "SUCCESS":
      draft.push({
        id: v4(),
        status: "SUCCESS",
        message: action.message,
      });
      break;

    case "ERROR":
      draft.push({
        id: v4(),
        status: "ERROR",
        message: action.message,
      });
      break;

    case "REMOVE":
      draft.shift();
      break;

    default:
      draft;
  }
};

export default notificationReducer;
